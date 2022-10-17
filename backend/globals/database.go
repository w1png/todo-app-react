package globals

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func Init() {
	db := Connect()
	defer db.Close()

	statement := "CREATE TABLE IF NOT EXISTS tasks (id PRIMARY KEY, title TEXT, completed BOOLEAN, due_date TEXT);"
	_, err := db.Exec(statement)
	if err != nil {
		panic(err)
	}
}

func Connect() *sql.DB {
	db, err := sql.Open("sqlite3", "./database.db")
	if err != nil {
		panic(err)
	}

	return db
}
