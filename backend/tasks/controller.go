package tasks

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddTasksRoutes(router_group *gin.RouterGroup) {
	router := router_group.Group("/tasks")

	router.GET("", getTasksAPI)
	router.DELETE("/:id", deleteTaskAPI)
	router.POST("", createTaskAPI)
	router.GET("/:id", getTaskAPI)
}

func createTaskAPI(c *gin.Context) {
	var task Task
	if err := c.BindJSON(&task); err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid JSON",
		})
	}

	task = createTask(task)
	c.JSON(200, task)
}

func getTasksAPI(c *gin.Context) {
	cookie := c.GetHeader("Cookie")
	tasks := getTasks(cookie)
	c.JSON(200, tasks)
}

func getTaskAPI(c *gin.Context) {
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

	task := getTask(id)
	c.JSON(200, task)
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

	Task{ID: strconv.Itoa(id)}.delete()
	c.JSON(200, gin.H{
		"message": "Task deleted",
	})
}
