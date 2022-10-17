package tasks

import "github.com/gin-gonic/gin"

func AddTasksRoutes(router_group *gin.RouterGroup) {
	router := router_group.Group("/tasks")

	router.GET("", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
}
