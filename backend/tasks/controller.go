package tasks

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddTasksRoutes(router_group *gin.RouterGroup) {
	router := router_group.Group("/tasks")

	router.GET("", getTasksAPI)
	router.DELETE("/:id", deleteTaskAPI)
	router.POST("", createTaskAPI)
}

func noUserIDCookie(c *gin.Context) {
	c.JSON(401, gin.H{
		"error": "No user_id cookie",
	})
}

func createTaskAPI(c *gin.Context) {
	cookie, err := c.Cookie("user_id")
	if err != nil {
		noUserIDCookie(c)
		return
	}

	var task Task
	if err := c.BindJSON(&task); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid JSON",
		})
	}
	task.Cookie = cookie
	task = createTask(task.Title, task.Cookie)
	fmt.Printf("ID: %d, Cookie: %s, Title: %s, Completed: %t", task.ID, cookie, task.Title, task.Completed)
	c.JSON(200, task)
}

func getTasksAPI(c *gin.Context) {
	cookie, err := c.Cookie("user_id")
	if err != nil {
		noUserIDCookie(c)
		return
	}
	c.JSON(200, getTasks(cookie))
}

func deleteTaskAPI(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{
			"error": "ID must be an integer",
		})
	}
	if !doesTaskExist(id) {
		c.JSON(404, gin.H{
			"error": "Task does not exist",
		})
	}

	Task{ID: id}.delete()
	c.JSON(200, nil)
}
