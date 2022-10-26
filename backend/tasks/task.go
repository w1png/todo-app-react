package tasks

import (
	"github.com/w1png/todo-app/globals"

	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	ID        int    `json:"id"`
	Cookie    string `json:"cookie"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

func (task Task) setCompleted(completed bool) {
	db := globals.Connect()
	db.Model(&task).Update("Completed", completed)
}

func (task Task) delete() {
	db := globals.Connect()
	db.Delete(&task, task.ID)
}

func createTask(title string, cookie string) Task {
	db := globals.Connect()
	task := Task{Title: title, Cookie: cookie, Completed: false}
	db.Create(&task)
	return task
}

func getTasks(cookie string) []Task {
	db := globals.Connect()

	var tasks []Task
	db.Model(&Task{}).Where("cookie = ?", cookie).Find(&tasks)

	if tasks == nil {
		return []Task{}
	}
	return tasks
}

func getTask(id int) Task {
	db := globals.Connect()

	var task Task
	db.First(&task, id)

	return task
}

func doesTaskExist(id int) bool {
	return getTask(id).ID != 0
}
