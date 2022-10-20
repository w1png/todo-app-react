package tasks

import (
	"github.com/w1png/todo-app/globals"
)

type Task struct {
	ID        int    `json:"id"`
	Cookie    string `json:"cookie"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

func (t *Task) setCompleted(completed bool) {
	t.Completed = completed

	db := globals.Connect()
	defer db.Close()

	db.Exec("UPDATE tasks SET completed = ? WHERE id = ?", completed, t.ID)
}

func (t Task) delete() {
	db := globals.Connect()
	defer db.Close()

	db.Exec("DELETE FROM tasks WHERE id = ?", t.ID)
}

func createTask(task Task) Task {
	db := globals.Connect()
	defer db.Close()

	db.Exec("INSERT INTO tasks (title, completed, due_date) VALUES (?, ?, ?)", task.Title, task.Completed)

	// return the task with the ID
	rows, err := db.Query("SELECT id FROM tasks WHERE title = ? AND completed = ? AND cookie = ?", task.Title, task.Completed, task.Cookie)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		rows.Scan(&task.ID)
	}

	return task
}

func getTasks(cookie string) []Task {
	db := globals.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT id, title, completed FROM tasks WHERE cookie = ?", cookie)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var tasks []Task
	for rows.Next() {
		var task Task
		rows.Scan(&task.ID, &task.Title, &task.Completed)
		tasks = append(tasks, task)
	}

	if len(tasks) == 0 {
		tasks = []Task{}
	}
	return tasks
}

func getTask(id int) Task {
	db := globals.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT id, title, completed FROM tasks WHERE id = ?", id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var task Task
	for rows.Next() {
		rows.Scan(&task.ID, &task.Title, &task.Completed)
	}

	return task
}

func doesTaskExist(id int) bool {
	return getTask(id).ID != 0
}
