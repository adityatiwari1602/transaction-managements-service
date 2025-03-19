# Use an official JDK runtime as base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/*.jar app.jar

# Expose port (same as in application.properties)
EXPOSE 7002

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
