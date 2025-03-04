using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace MyWebSite.Server.Health
{
    internal sealed class DatabaseHealthCheck : IHealthCheck
    {
        public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        {
            // Performing fake async task..
            // Real DB check will be implemented after the project is fully deployed.
            await Task.Run(() => { Thread.Sleep(100); });
            
            return HealthCheckResult.Healthy();
        }
    }
}
