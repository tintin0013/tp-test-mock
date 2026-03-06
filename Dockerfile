#Create MySQL Image for JSP Tutorial Application
FROM mysql:8.0
COPY ./sqlfiles/ /docker-entrypoint-initdb.d
EXPOSE 3306
CMD ["mysqld","--default-authentication-plugin=mysql_native_password"]