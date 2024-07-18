CREATE TABLE Ordine(
	COD INT AUTO_INCREMENT,
	Data date NOT NULL,
	StatoOrdine ENUM ('In Attesa','Consegnato') DEFAULT NULL,
	PRIMARY KEY(COD)
);

CREATE TABLE Pizza(
	IDP INT AUTO_INCREMENT,
	Nome VARCHAR(100) UNIQUE NOT NULL,
	Prezzo TINYINT CHECK(Prezzo>0) NOT NULL,
	ImgURL VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY(IDP)
);

CREATE TABLE Ordini_Pizze(
	Pizza INT,
	Ordine INT,
	PRIMARY KEY(Pizza, Ordine),
	CONSTRAINT FK_Pizza 
		FOREIGN KEY (Pizza) REFERENCES Pizza(IDP),
	CONSTRAINT FK_Ordine
		FOREIGN KEY (Ordine) REFERENCES Ordine(COD)
);

CREATE TABLE Ingrediente(
	ID INT AUTO_INCREMENT,
	Nome VARCHAR(100) UNIQUE NOT NULL,
	Prezzo TINYINT CHECK(Prezzo>0) NOT NULL,
	ImgURL VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY(ID)
);

CREATE TABLE IngredientiPizza(
	Pizza INT ,
	Ingrediente INT,
	PRIMARY KEY(Pizza, Ingrediente),
	CONSTRAINT FK_Pizza 
		FOREIGN KEY (Pizza) REFERENCES Pizza(IDP),
	CONSTRAINT FK_Ingrediente 
		FOREIGN KEY (Ingrediente) REFERENCES Ingrediente(ID)
);

CREATE TABLE NoPizza(
	IDNP INT AUTO_INCREMENT,
	Nome VARCHAR(100) UNIQUE NOT NULL,
	Prezzo TINYINT CHECK(Prezzo>0) NOT NULL,
	ImgURL VARCHAR(100) UNIQUE NOT NULL,
	Descrizione TEXT,
	Ordine INT,
	PRIMARY KEY(IDNP),
	CONSTRAINT FK_OrdineNoPizza 
		FOREIGN KEY (Ordine) REFERENCES Ordine(COD)
);

INSERT INTO Ordine (COD, Data, StatoOrdine)
VALUES (1,'2024-07-17', 'In Attesa'),
	   (2,'2024-08-17', 'Consegnato');

INSERT INTO Pizza (IDP, Nome, Prezzo, ImgURL)
VALUES (1,'Margherita', 8, 'url_immagine_margherita'),
       (2,'Diavola', 10, 'url_immagine_diavola'),
	   (3,'Bufala', 9, 'url_immagine_bufala');

INSERT INTO Ordini_Pizze (Pizza, Ordine)
VALUES (1, 1),
       (2, 1),
	   (3, 1),
	   (1, 2),
       (2, 2),
	   (3, 2);