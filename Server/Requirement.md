Core Platform
Authentication (20 APIs)
Register
Login
Logout
Refresh Token
Verify Email
Forgot Password
Reset Password
Change Password
MFA Enable
MFA Verify
MFA Disable
Sessions
Revoke Session
Social Login
OAuth Authorize
OAuth Callback
API Keys
Revoke API Key
SSO Login
SAML Login
User Management (20 APIs)
Create User
Update User
Delete User
Get User
List Users
User Permissions
User Roles
User Activity
User Preferences
User Avatar
User Status
User Search
User Export
User Import
User Notification Settings
User Security Settings
User Devices
User Teams
User Access Logs
User Audit
CRM Module (40 APIs)
Leads
Create Lead
Update Lead
Delete Lead
Get Lead
Search Leads
Import Leads
Export Leads
Assign Lead
Merge Lead
Lead Activity
Opportunities
Create Opportunity
Update Opportunity
Delete Opportunity
Opportunity Notes
Opportunity Stage
Opportunity Owner
Opportunity Analytics
Pipelines
Create Pipeline
Update Pipeline
Delete Pipeline
Move Stage
Pipeline Analytics
Tasks
Create Task
Update Task
Delete Task
Complete Task
Assign Task
Notes
Create Note
Update Note
Delete Note
Custom Fields
Create Field
Update Field
Delete Field
List Fields
Contacts Module (25 APIs)
Create Contact
Update Contact
Delete Contact
Get Contact
Search Contact
Import Contact
Export Contact
Contact Notes
Contact Tags
Contact Activity
Contact Timeline
Contact Segments
Contact Preferences
Contact Source
Contact Ownership
Contact Merge
Contact Duplicate Detection
Contact Archive
Contact Restore
Contact History
Contact Consent
Contact Unsubscribe
Contact Events
Contact Analytics
Contact Sync
Messaging Module (50 APIs)
Messages
Send Message
Receive Message
Delete Message
Edit Message
Forward Message
Reply Message
Message Status
Message Analytics
Message Search
Message Reactions
Templates
Create Template
Update Template
Delete Template
Clone Template
Approve Template
Broadcasts
Create Broadcast
Schedule Broadcast
Pause Broadcast
Resume Broadcast
Cancel Broadcast
Broadcast Analytics
Attachments
Upload File
Delete File
File Metadata
Inbox
Open Conversation
Close Conversation
Archive Conversation
Assign Conversation
Transfer Conversation
Conversation Tags
Internal Notes
Conversation Search
Conversation Analytics
Conversation History
Automation Builder (40 APIs)
Create Workflow
Update Workflow
Delete Workflow
Publish Workflow
Pause Workflow
Resume Workflow
Clone Workflow
Import Workflow
Export Workflow
Workflow Analytics
Workflow Logs
Workflow Errors
Workflow Versions
Workflow Preview
Workflow Validation
Workflow Testing
Workflow Scheduling
Workflow Triggers
Workflow Conditions
Workflow Actions
Workflow Variables
Workflow Webhooks
Workflow Templates
Workflow Marketplace
Workflow Permissions
AI Agent Module (50 APIs)
Agent Management
Create Agent
Update Agent
Delete Agent
Publish Agent
Clone Agent
Knowledge Base
Upload Document
Delete Document
Index Document
Reindex Document
Search Knowledge
AI Conversations
Start Chat
Continue Chat
End Chat
Agent Memory
Agent History
AI Training
Add Training Data
Remove Training Data
Fine Tune Agent
Agent Evaluation
AI Tools
Tool Registry
Tool Execute
Tool Permissions
Analytics
Agent Usage
Agent Accuracy
Agent Cost
Agent Satisfaction
Plus dozens more around prompts, embeddings, RAG, vector search, tool calling, reasoning, memory, and safety controls.
Marketplace Module (30 APIs)
Apps
Publish App
Update App
Delete App
Install App
Uninstall App
Templates
Publish Template
Install Template
Rate Template
Review Template
Billing
Purchase App
Subscription
Revenue Reports
Developer Listings
Submit Listing
Approval Status
Listing Analytics
Public Developer API (40 APIs)
API Keys
Create Key
Revoke Key
Rotate Key
OAuth
Create OAuth App
Update OAuth App
Delete OAuth App
Webhooks
Register Webhook
Update Webhook
Delete Webhook
Retry Webhook
SDK
SDK Downloads
SDK Versions
API Usage
Usage Analytics
Rate Limits
API Logs
Enterprise Features (50 APIs)
Organizations
Create Organization
Update Organization
Delete Organization
White Label
Branding
Custom Domain
Custom SMTP
Custom Login
Security
SAML
SCIM
SSO
IP Whitelist
Audit Logs
Compliance
GDPR Export
GDPR Delete
Data Retention
Consent Management
Permissions
RBAC
ABAC
Team Policies
Monitoring
Health Checks
Usage Monitoring
Error Tracking
Integrations (100+ APIs)
Instagram
DM
Comment
Story
Mentions
Webhooks
Facebook
Messenger
Leads
Pages
WhatsApp
Templates
Messages
Contacts
Shopify
Orders
Products
Customers
Email
Campaigns
Lists
Templates
Stripe
Customers
Payments
Subscriptions
CRMs
HubSpot
Salesforce
Zoho
Ads
Meta Ads
Google Ads
TikTok Ads
Total Estimated
Module	APIs
Core Platform	40
CRM	40
Contacts	25
Messaging	50
Automation	40
AI Agents	50
Marketplace	30
Public API	40
Enterprise	50
Integrations	100+
Total	465–550 APIs
If you're serious about building a ManyChat competitor, I would actually start by designing the database schema, microservices architecture, and API gateway structure first. Those decisions will determine whether you can scale from 50 APIs to 500 APIs without rewriting the platform.
sure 
Since you're building a serious ManyChat competitor, here's the architecture I would use from day one so you can grow from 20 APIs → 500+ APIs without rebuilding.
High-Level Architecture
                    CDN
                     |
                Next.js Frontend
                     |
               API Gateway
                     |
 --------------------------------------------------
 |         |          |         |        |         |
Auth    User     Messaging   Flow    AI Agent   Billing
Service Service   Service   Service  Service    Service
 |         |          |         |        |         |
 --------------------------------------------------
                     |
                Event Bus
            (Kafka/RabbitMQ)
                     |
 --------------------------------------------------
 |         |          |         |        |         |
CRM     Analytics  Webhook   Contact  Integration Marketplace
Service  Service   Service   Service     Service    Service
Microservices
1. Auth Service
Database:
Users
Roles
Permissions
Sessions
API Keys
Responsibilities:
Login
JWT
OAuth
SSO
MFA
2. User Service
Tables:
Users
Teams
Workspaces
Invitations
Responsibilities:
Team Management
Agency Accounts
Workspace Settings
3. Contact Service
Tables:
Contacts
Tags
Segments
Custom Fields
Responsibilities:
Subscriber Management
Audience Building
4. Messaging Service
Tables:
Conversations
Messages
Attachments
Broadcasts
Responsibilities:
DM Sending
DM Receiving
Inbox
5. Automation Service
Tables:
Workflows
Nodes
Triggers
Conditions
Actions
Responsibilities:
Flow Builder
Automation Engine
This becomes your biggest service.
6. AI Agent Service
Tables:
Agents
Prompts
Memory
Knowledge Base
Embeddings
Responsibilities:
AI Replies
AI Agents
RAG
Tool Calling
7. Integration Service
Tables:
Connected Accounts
Tokens
Webhooks
Responsibilities:
Instagram
Facebook
WhatsApp
Telegram
Shopify
HubSpot
Stripe
Every future integration goes here.
8. CRM Service
Tables:
Leads
Deals
Pipelines
Tasks
Notes
Responsibilities:
Sales CRM
9. Billing Service
Tables:
Plans
Subscriptions
Invoices
Payments
Responsibilities:
Stripe
Revenue Tracking
10. Analytics Service
Tables:
Events
Metrics
Reports
Responsibilities:
Dashboard
Charts
KPI Tracking
11. Marketplace Service
Tables:
Apps
Templates
Reviews
Purchases
Responsibilities:
Third-party ecosystem
Database Design
Use:
Primary Database
PostgreSQL
Stores:

Users
Workspaces
Contacts
Billing
CRM
Cache
Redis
Stores:

Sessions
Rate Limits
Queues
Temporary Data
Search
Elasticsearch
Stores:

Message Search
Contact Search
Analytics Search
Object Storage
Amazon S3
Stores:

Images
Videos
Documents
Attachments
Suggested Tech Stack
Frontend
Next.js
React
TypeScript