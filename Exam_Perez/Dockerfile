# Etapa de construcción
FROM maven:3.9.5-amazoncorretto-17 AS build

# Establecer variables de entorno para codificación
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    MAVEN_OPTS="-Dfile.encoding=UTF-8 -Dproject.build.sourceEncoding=UTF-8"

# Establecer directorio de trabajo
WORKDIR /app

# Copiar solo pom.xml primero para aprovechar la cache de Docker
COPY pom.xml .

# Descargar dependencias (se cachea si pom.xml no cambia)
RUN mvn dependency:go-offline -B

# Copiar código fuente
COPY src ./src

# Construir la aplicación con optimizaciones y codificación UTF-8
RUN mvn clean package -DskipTests -B -q \
    -Dfile.encoding=UTF-8 \
    -Dproject.build.sourceEncoding=UTF-8 \
    -Dproject.reporting.outputEncoding=UTF-8

# Etapa de ejecución
FROM amazoncorretto:17-alpine-jdk

# Establecer variables de entorno para codificación
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    JAVA_OPTS="-Dfile.encoding=UTF-8 -Xmx512m -Xms256m"

# Crear usuario no root para seguridad
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el jar desde la etapa de construcción
COPY --from=build /app/target/*.jar app.jar

# Cambiar propietario de los archivos
RUN chown -R appuser:appgroup /app

# Cambiar al usuario no root
USER appuser

# Exponer puerto
EXPOSE 8080

# Variables de entorno para producción
ENV SPRING_PROFILES_ACTIVE=prod

# Comando para ejecutar la aplicación
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# Agregar usuario no-root por seguridad
RUN addgroup -g 1000 appuser && adduser -u 1000 -G appuser -s /bin/sh -D appuser

# Crear directorio de la aplicación
RUN mkdir -p /app && chown appuser:appuser /app

# Cambiar al usuario no-root
USER appuser

# Copiar el JAR desde la etapa de construcción
COPY --from=build --chown=appuser:appuser /app/target/Exam_Perez-0.0.1-SNAPSHOT.jar /app/api-v1.jar

# Establecer directorio de trabajo
WORKDIR /app

# Exponer el puerto
EXPOSE 8080

# Configurar JVM para contenedor
ENV JAVA_OPTS="-Xmx512m -Xms256m -XX:+UseG1GC"

# Punto de entrada con configuración optimizada
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar api-v1.jar --spring.profiles.active=prod"]
