package main

import (
	"os"

	"github.com/gin-gonic/gin"

	"github.com/w1png/todo-app/globals"
	"github.com/w1png/todo-app/tasks"
)

var router = gin.Default()

func getRoutes() {
	task_group := router.Group("/api")
	// call the function addTasksRoutes from tasks/controller.go
	tasks.AddTasksRoutes(task_group)
}

func main() {
	if _, err := os.Stat("./database.db"); os.IsNotExist(err) {
		globals.Init()
	}

	getRoutes()
	router.Run()
}
