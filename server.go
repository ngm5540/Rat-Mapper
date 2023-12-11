package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

const exampleData = "{\"furColor\":\"grey\",\"eyeColor\":\"red\",\"earSize\":\"medium\",\"bloodType\":\"AB\"}"

// idiotically simple http server for testing purposes
func main() {
	if len(os.Args) < 2 {
		fmt.Fprintf(os.Stderr, "Usage: server.go listenAddress\n")
		os.Exit(1)
	}
	listenAddress := os.Args[1]
	delay := 0
	if len(os.Args) >= 3 {
		delay, _ = strconv.Atoi(os.Args[2])
	}	

	http.HandleFunc("/parse/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s: %s", r.Method, r.URL.Path)
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", 
		"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		// pseudo network-lag
		time.Sleep(time.Duration(delay))

		// response 🗣️
		fmt.Fprintf(w, "%s\n", exampleData);
		// w.WriteHeader(400);
	})

	log.Printf("Running http server on %s\n", listenAddress)
	log.Printf("All responses will be delayed by %d ns\n", delay)
	log.Fatal(http.ListenAndServe(listenAddress, nil))
}
