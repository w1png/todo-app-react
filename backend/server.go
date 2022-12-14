package main

import (
	"github.com/gin-gonic/gin"

	"github.com/w1png/todo-app/globals"
	"github.com/w1png/todo-app/tasks"
)

var router = gin.Default()

func getRoutes() {
	task_group := router.Group("/api")
	tasks.AddTasksRoutes(task_group)
}

func main() {
	db := globals.Connect()
	db.AutoMigrate(&tasks.Task{})

	getRoutes()
	router.Run()
}
