CREATE TABLE anlagen (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  performance DOUBLE NOT NULL,
  amount INT NULL,
  latitude VARCHAR(255),
  longitude VARCHAR(255),
  PRIMARY KEY(id)
)