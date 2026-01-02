# Stage 1: Build
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin: 17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/Zenith-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8080

# Run the application WITH prod profile
ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]