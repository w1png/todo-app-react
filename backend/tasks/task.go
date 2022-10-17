package tasks

import "time"

type Task struct {
	ID        string
	cookie    string
	Title     string
	Completed bool
	Due       time.Time
}
