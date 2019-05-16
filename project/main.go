package main

import (
	"html/template"
	"log"
	"net/http"

)

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("templates/*.gohtml"))
}

func main() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("style/css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("javascript"))))
	http.HandleFunc("/", idx)
	http.HandleFunc("/game", game)
	http.ListenAndServe(":8080", nil)
}

func game(w http.ResponseWriter, r *http.Request) {
err := tpl.ExecuteTemplate(w, "game.gohtml", nil)
if err != nil {
log.Println("LOGGED", err)
http.Error(w, "Internal server error", http.StatusInternalServerError)
return}
}

func idx(w http.ResponseWriter, r *http.Request) {
err := tpl.ExecuteTemplate(w, "main.gohtml", nil)
if err != nil {
log.Println("LOGGED", err)
http.Error(w, "Internal server error", http.StatusInternalServerError)
return}
}