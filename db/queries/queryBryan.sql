CREATE TABLE ft_ordine(
	ido INT AUTO_INCREMENT,
	Data datetime DEFAULT CURRENT_TIMESTAMP,
	Stato ENUM ('In Attesa','Consegnato') DEFAULT NULL,
	PRIMARY KEY(ido)
);

CREATE TABLE ft_pizza(
	idp INT AUTO_INCREMENT,
	Nome VARCHAR(100) UNIQUE NOT NULL,
	Prezzo TINYINT CHECK(Prezzo>0) NOT NULL,
	Img TEXT NOT NULL,
	Descrizione TEXT,
	PRIMARY KEY(idp)
);

CREATE TABLE ft_ordini_pizze(
	ordine_ido INT,
	pizza_idp INT,
	quantita INT,
	PRIMARY KEY(ordine_ido, pizza_idp),
	CONSTRAINT FK_Pizza 
		FOREIGN KEY (pizza_idp) REFERENCES ft_pizza(idp),
	CONSTRAINT FK_Ordine
		FOREIGN KEY (ordine_ido) REFERENCES ft_ordine(ido)
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

INSERT INTO ft_ordine (Stato)
VALUES ('In Attesa'),
	   ('Consegnato');

INSERT INTO ft_pizza (Nome, Prezzo, Img)
VALUES ('Margherita', 8, 'margherita.jpeg'),
       ('Diavola', 10, 'diavola.jpeg'),
	   ('Bufala', 9, 'url_immagine_bufala');

INSERT INTO ft_ordini_pizze (ft_pizza, ft_ordine)
VALUES (1, 1),
       (2, 1),
	   (3, 1),
	   (1, 2),
       (2, 2),
	   (3, 2);
	   

	 
INSERT INTO ft_ordini_pizze (ordine_ido, pizza_idp, quantita)
VALUES (1, 1, 4),
       (2, 1, 1),
	   (3, 1, 3),
	   (1, 2, 1),
       (2, 2, 6),
	   (3, 2, 2);
