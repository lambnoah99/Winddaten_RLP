CREATE TABLE parks (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  performance DOUBLE NOT NULL,
  amount INT NOT NULL,
  latitude VARCHAR(255),
  longitude VARCHAR(255),
  constructionYear INT,
  type VARCHAR(255),
  place VARCHAR(255),
  district VARCHAR(255),
  notes VARCHAR(512),
  currentPerformance INT,
  PRIMARY KEY(id)
)
