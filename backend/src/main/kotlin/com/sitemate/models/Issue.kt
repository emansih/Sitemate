package com.sitemate.models

import kotlinx.serialization.Serializable

@Serializable
data class Issue(
    val issueId: Int,
    var issueTitle: String,
    var issueDescription: String
){
    init {
        require(issueTitle.isNotEmpty()){
            "Issue title cannot be empty"
        }
        require(issueDescription.isNotEmpty()){
            "Issue description cannot be empty"
        }
    }
}
