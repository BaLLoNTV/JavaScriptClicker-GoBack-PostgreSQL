package main

import (
	"fmt"
    "net/http"
)

func main() {
	err := http.Handle("/style/", http.FileServer(http.Dir("\css")))
	fmt.Println(err)

}