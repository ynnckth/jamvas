# Monitoring Azure App Service

* The app service is configured to forward console logs to the log analytics workspace
* The log analytics workspace contains an instance of Application Insights 
* You can search for log entries by querying by the `AppServiceConsoleLogs` table. 
  This table name is defined by the diagnostics setting that forwards the logs from the app service.   

App insights uses the Kusto query language:
```
AppServiceConsoleLogs
| project TimeGenerated, Level, ResultDescription
| where ResultDescription contains "Tom"
| sort by TimeGenerated desc 
```
