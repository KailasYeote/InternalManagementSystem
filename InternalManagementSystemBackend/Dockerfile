# Step 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
# Copy only the pom.xml first to cache dependencies (faster builds)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build
COPY . .
RUN mvn clean package -DskipTests

# Step 2: Run the application
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Use a wildcard to find the JAR, but rename it to app.jar for simplicity
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# Render uses the PORT environment variable
ENV PORT=8080

ENTRYPOINT ["java", "-Xmx512m", "-jar", "app.jar"]