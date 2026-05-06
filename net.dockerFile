# =============================================================================
# DIB.Services.WebApi - Optimized Multi-Stage Dockerfile with Angular UI
# =============================================================================
# Build optimized for .NET 9 ASP.NET Core Web API with Angular frontend
# =============================================================================
# Stage 2: Final Runtime Image
# -----------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS final
ARG APP_NAME
ARG APP_VERSION
ARG ENTRYPOINT
# Update packages to fix security vulnerabilities
RUN apk update && apk upgrade --no-cache

# Security: Create non-root user
RUN addgroup -g 1000 -S dibuser && \
    adduser -u 1000 -S dibuser -G dibuser

WORKDIR /app

# Expose HTTP port only (no HTTPS in Docker)
EXPOSE 8080

#USER dibuser

WORKDIR /app

COPY  . /app

ENV APP_NAME=$APP_NAME
ENV APP_VERSION=$APP_VERSION
# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_RUNNING_IN_CONTAINER=true \
    DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true \
    ASPNETCORE_URLS=http://+:8080
RUN echo ${ENTRYPOINT} > ./run.sh
RUN chmod 777 ./run.sh
ENTRYPOINT ["sh", "run.sh"]
