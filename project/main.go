package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	"encoding/json"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

var tpl *template.Template

type loginInput struct {
	Login string `json:"login"`
	Pwd   string `json:"pwd"`
}

type signupInput struct {
	Login string `json:"login"`
	Pwd1  string `json:"pwd1"`
	Pwd2  string `json:"pwd2"`
}

type DB struct{ *sql.DB }

type controller struct{ db *DB }

func init() {
	tpl = template.Must(template.ParseGlob("templates/*.gohtml"))
}

func initDB() (*DB, error) {
	connStr := "user=postgres password=mypass dbname=sitedb sslmode=disable port=5432"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return &DB{db}, nil
}

func main() {
	db, err := initDB()
	if err != nil {
		log.Fatal("failed to init db:", err)
	}

	c := &controller{db}

	r := mux.NewRouter()
	r.PathPrefix("/css/").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("style/css"))))
	r.PathPrefix("/js/").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("javascript"))))

	r.HandleFunc("/auth/signup", c.signup).Methods(http.MethodPost)
	r.HandleFunc("/auth/login", c.login).Methods(http.MethodPost)
	r.HandleFunc("/", c.idx)
	r.HandleFunc("/game", c.game)

	http.ListenAndServe(":8080", r)
}

func (c *controller) game(w http.ResponseWriter, r *http.Request) {
	err := tpl.ExecuteTemplate(w, "game.gohtml", nil)
	if err != nil {
		log.Println("LOGGED", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}

func (c *controller) idx(w http.ResponseWriter, r *http.Request) {
	err := tpl.ExecuteTemplate(w, "main.gohtml", nil)
	if err != nil {
		log.Println("LOGGED", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}

func (c *controller) signup(w http.ResponseWriter, r *http.Request) {
	signupData := signupInput{}
	if err := getPostData(r, &signupData); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error: " + err.Error()))
		return
	}

	exists, err := userExists(signupData.Login, c.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error: " + err.Error()))
		return
	}

	if exists {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("пользователь уже существует"))
		return
	}
	
	if signupData.Pwd1==signupData.Pwd2 {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("пароли не совпадают"))
		return
	}

	_, err = c.db.Exec("insert into siteaccs (siteuser, password) values ($1,$2)", signupData.Login, signupData.Pwd1)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error: " + err.Error()))
	}
}

func (c *controller) login(w http.ResponseWriter, r *http.Request) {
	loginData := loginInput{}
	if err := getPostData(r, &loginData); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error: " + err.Error()))
		return
	}

	exists, err := userExists(loginData.Login, c.db)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error: " + err.Error()))
		return
	}

	if !exists {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("пользователь не существует"))
		return
	}

	row := c.db.QueryRow(fmt.Sprintf("select password from siteaccs where siteuser = '%s'", loginData.Login))
	pwd := ""
	if err = row.Scan(&pwd); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("internal server error: " + err.Error()))
		return
	}

	if pwd != loginData.Pwd {
		w.WriteHeader(http.StatusForbidden)
		w.Write([]byte("неверный пароль"))
	}
}

func getPostData(r *http.Request, data interface{}) error {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return err
	}

	return json.Unmarshal(body, &data)
}

func userExists(username string, db *DB) (bool, error) {
	rows, err := db.Query(fmt.Sprintf("select 1 from siteaccs WHERE siteuser = '%s'", username))
	if err != nil {
		return false, err
	}
	defer rows.Close()

	return rows.Next(), nil
}
