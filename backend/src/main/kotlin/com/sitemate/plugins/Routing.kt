package com.sitemate.plugins

import com.sitemate.Repository
import com.sitemate.models.Issue
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        // Get all issues
        get("/api/v1/issues") {
            call.respond(Repository.githubIssues)
        }
        // Create issue
        post("/api/v1/issues"){
            val formParameters = call.receiveParameters()
            val issueTitle = formParameters["issueTitle"].toString()
            val issueDescription = formParameters["issueDescription"].toString()
            val currentIssueSize = Repository.githubIssues.size
            val issue = Issue(currentIssueSize.plus(1), issueTitle, issueDescription)
            Repository.githubIssues.add(issue)
            call.respond(issue)
        }
        // Get issue by ID
        get("/api/v1/issues/{issueId}") {
            try {
                val issueId = call.parameters["issueId"]
                // index starts from 0
                val realIssueId = Integer.parseInt(issueId).minus(1)
                call.respond(Repository.githubIssues[realIssueId])
            } catch (exception: Exception){
                // When issue does not exist
                // When issueId is not an integer
                exception.printStackTrace()
                call.respond(HttpStatusCode.BadRequest)
            }
        }
        // Update issue by ID
        put("/api/v1/issues/{issueId}") {
            try {
                val issue = call.receive<Issue>()

                val issueId = call.parameters["issueId"]
                val issueRepo = Repository.githubIssues.find {
                    it.issueId == Integer.parseInt(issueId).minus(1)
                }
                issueRepo?.issueTitle = issue.issueTitle
                issueRepo?.issueDescription = issue.issueDescription
            } catch (exception: Exception){
                // When issue does not exist
                // When issueId is not an integer
                // When issue title is empty
                // When issue description is empty
                call.respond(HttpStatusCode.BadRequest)
            }
        }
        // Delete issue by ID
        delete("/api/v1/issues/{issueId}"){
            try {
                val issueId = call.parameters["issueId"]
                Repository.githubIssues.removeAt(Integer.parseInt(issueId).minus(1))
                call.respond(HttpStatusCode.OK)
            } catch (exception: Exception){
                // When issue does not exist
                // When issueId is not an integer
                call.respond(HttpStatusCode.BadRequest)
            }
        }
    }
}
