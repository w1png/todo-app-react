package tasks

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddTasksRoutes(router_group *gin.RouterGroup) {
	router := router_group.Group("/tasks")

	router.GET("", getTasksAPI)
	router.POST("/:id/complete", setTaskCompletedAPI)
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

func setTaskCompletedAPI(c *gin.Context) {
	cookie, err := c.Cookie("user_id")
	if err != nil {
		noUserIDCookie(c)
		return
	}
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid task id",
		})
		return
	}
	if !doesTaskExist(id) {
		c.JSON(404, gin.H{
			"error": "Task not found",
		})
		return
	}

	completed := true
	completed_value := c.Query("completed")
	if completed_value == "false" {
		completed = false
	}

	task := getTask(id)
	if task.Cookie != cookie {
		c.JSON(401, gin.H{
			"error": "Unauthorized",
		})
		return
	}
	task.setCompleted(completed)
}
