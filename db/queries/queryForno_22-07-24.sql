-- Usa db pizzeria
USE pizzeria;

-- Toglie la safemode per modifiche importanti
-- SET SQL_SAFE_UPDATES = 0;


-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ------------------------------------------------------
-- 				Creazione tabelle progetto
-- ------------------------------------------------------
CREATE TABLE ft_prodotto (
    codProd VARCHAR(50) PRIMARY KEY,
    link TEXT,
    nome VARCHAR(255),
    descrizione TEXT,
    prezzo DECIMAL(5, 2)
);

CREATE TABLE ft_ordine(
	codOrd INT AUTO_INCREMENT PRIMARY KEY,
	moment datetime DEFAULT CURRENT_TIMESTAMP,
	statoOrdine ENUM ('In Attesa','Consegnato') DEFAULT NULL
);

CREATE TABLE ft_ordine_prodotto(
	codProd VARCHAR(50),
	codOrd INT,
    quantita INT,
	PRIMARY KEY(codProd, codOrd),
	CONSTRAINT FK_codProd 
		FOREIGN KEY (codProd) REFERENCES ft_prodotto(codProd),
	CONSTRAINT FK_codOrd
		FOREIGN KEY (codOrd) REFERENCES ft_ordine(codOrd)
);
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////

-- ------------------------------------------------------
--				Inserimento dati in tabelle 
-- ------------------------------------------------------
INSERT INTO 
	ft_ordine (statoOrdine)
VALUES 
	('In Attesa'),
	('Consegnato');
       
INSERT INTO 
	ft_ordine_prodotto (codProd, codOrd, quantita)
VALUES 
	('bb_acq', 1, 1),
    ('bb_ccl', 1, 1),
    ('pc_wrl', 1, 1),
    ('bb_acq', 2, 1),
    ('bb_bck', 2, 1),
    ('bb_ccl', 2, 1),
    ('pc_wrl', 2, 1),
    ('pg_ccr', 2, 1);


INSERT INTO
	ft_prodotto(codProd, link, nome, descrizione, prezzo)
VALUES
	('bb_acq','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_acq.jpg', 'Acqua Minerale Microfiltrata', 'in vetro - 75 cl.', 3.0),
	('bb_bck','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_bck.jpg', 'Becks', 'in vetro - 33 cl.', 6.0),
	('bb_ccl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_ccl.jpg', 'Coca Cola', 'in vetro - 33 cl.', 3.0),
	('bb_ccz','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_ccz.jpg', 'Coca Cola Zero', 'in vetro - 33 cl.', 5.0),
	('bb_cer','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_cer.jpg', 'Ceres', 'in vetro - 33 cl.', 4.0),
	('bb_chn','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_chn.jpg', 'Chinotto', 'in vetro - 33 cl.', 4.0),
	('bb_esl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_esl.jpg', 'The al Limone', 'in lattina - 33 cl.', 6.0),
	('bb_esp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_esp.jpg', 'The alla Pesca', 'in lattina - 33 cl.', 3.0),
	('bb_fnt','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_fnt.jpg', 'Fanta', 'in vetro - 33 cl.', 3.0),
	('bb_grb','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_grb.jpg', 'Grimbergen Blanche', '25 cl.', 6.0),
	('bb_grd','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_grd.jpg', 'Grimbergen Double', 'in vetro - 25 cl.', 4.0),
	('bb_grl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_grl.jpg', 'Grimbergen Blonde', 'in vetro - 25 cl.', 5.0),
	('bb_mor','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_mor.jpg', 'Moretti', 'in vetro - 66 cl.', 3.0),
	('bb_por','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_por.jpg', 'Poretti Ipa', 'in vetro - 33 cl.', 4.0),
	('bb_shw','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_shw.jpg', 'Acqua Tonica', 'in lattina - 33 cl.', 4.0),
	('bb_spr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_spr.jpg', 'Sprite', 'in vetro - 33 cl.', 4.0),
	('bb_ten','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/bb_ten.jpg', 'Super Tennets', 'in vetro - 33 cl.', 5.0),
	('cz_apr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/cz_apr.jpg', 'Calzone APERTO Classico', 'Mozzarella Pomodoro Prosciutto Cotto ', 8.0),
	('cz_ccc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/cz_ccc.jpg', 'Calzone Chiuso Classico', 'Mozzarella Pomodoro Prosciutto Cotto ', 12.0),
	('cz_ccv','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/cz_ccv.jpg', 'Calzone Chiuso alle verdure', 'Carciofini Funghi Melanzane Mozzarella Olive Peperoni Pomodoro Zucchine', 10.0),
	('cz_pss','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/cz_pss.jpg', 'Calzone APERTO Toscana al forno', 'Castelmagno Mozzarella patate al forno Pomodoro Salsiccia toscana', 11.0),
	('cz_pst','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/cz_pst.jpg', 'Calzone APERTO Stracchino e patate', 'Mozzarella patate lesse Stracchino ', 7.0),
	('cz_scc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/cz_scc.jpg', 'Calzone APERTO Salsiccia toscana e scamorza', 'Mozzarella Pomodoro Salsiccia toscana Scamorza', 10.0),
	('cz_sfr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/cz_sfr.jpg', 'Calzone APERTO Salsiccia e friarielli', 'Friarielli Mozzarella Pomodoro Salsiccia', 7.0),
	('fc_brr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_brr.jpg', 'Burrata', 'Burrata Origano Pomodorini Freschi Rucola ', 5.0),
	('fc_dcc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_dcc.jpg', 'Della Casa con Crudo', 'Mozzarella di Bufala Origano Pomodorini Freschi Prosciutto Crudo Rucola', 5.0),
	('fc_dcs','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_dcs.jpg', 'Della Casa', 'Mozzarella di Bufala Origano Pomodorini Freschi Rucola', 5.0),
	('fc_dnn','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_dnn.jpg', 'Della Nonna', 'Mais Origano Pinoli Pomodorini Freschi Rucola', 7.0),
	('fc_lrd','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_lrd.jpg', 'Lardo', 'Lardo', 7.0),
	('fc_mst','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_mst.jpg', 'Mista', 'Lardo Mozzarella di Bufala Origano Pomodorini Freschi Prosciutto Crudo Rucola Speck ', 6.0),
	('fc_pcr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_pcr.jpg', 'Prosciutto Crudo', 'Prosciutto Crudo', 8.0),
	('fc_rsa','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_rsa.jpg', 'Rosa', 'Olive Origano Pomodorini Freschi Rucola', 5.0),
	('fc_srr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/fc_srr.jpg', 'Stracchino e Rosmarino', 'Rosmarino Stracchino', 6.0),
	('pc_bfl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_bfl.jpg', 'Bufala', 'Mozzarella di Bufala Pomodoro', 9.0),
	('pc_bnc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_bnc.jpg', 'Bianca', 'Mozzarella ', 8.0),
	('pc_brt','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_brt.jpg', 'Burrata', 'Burrata Pomodoro Rucola', 11.0),
	('pc_bsk','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_bsk.jpg', 'Bismark', 'Mozzarella Pomodoro Prosciutto Cotto Uova', 9.0),
	('pc_ccc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_ccc.jpg', 'Capricciosa', 'Carciofini Funghi Mozzarella Olive Pomodoro Prosciutto Cotto Salame Piccante', 7.0),
	('pc_clz','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_clz.jpg', 'Calzone', 'Mozzarella Pomodoro Prosciutto Cotto', 10.0),
	('pc_cpl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_cpl.jpg', 'Cipolla', 'Cipolla Mozzarella Pomodoro', 7.0),
	('pc_cpr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_cpr.jpg', 'Capperi', 'Capperi Mozzarella Pomodoro', 9.0),
	('pc_fhp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_fhp.jpg', 'Funghi e Prosciutto', 'Funghi Mozzarella Pomodoro Prosciutto Cotto', 11.0),
	('pc_fnh','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_fnh.jpg', 'Funghi', 'Funghi Mozzarella Pomodoro', 12.0),
	('pc_fpo','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_fpo.jpg', 'Funghi Olive e Prosciutto', 'Funghi Mozzarella Olive Pomodoro Prosciutto Cotto', 8.0),
	('pc_ggz','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_ggz.jpg', 'Gorgonzola', 'Gorgonzola Mozzarella Pomodoro', 10.0),
	('pc_mas','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_mas.jpg', 'Mais', 'Mais Mozzarella Pomodoro', 8.0),
	('pc_mhr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_mhr.jpg', 'Margherita Rinforzata', 'Doppia Mozzarella Pomodoro ', 10.0),
	('pc_mlz','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_mlz.jpg', 'Melanzane', 'Melanzane Mozzarella Pomodoro', 7.0),
	('pc_mrh','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_mrh.jpg', 'Margherita', 'Mozzarella Pomodoro', 8.0),
	('pc_mrn','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_mrn.jpg', 'Marinara', 'Aglio Origano Pomodoro', 9.0),
	('pc_npl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_npl.jpg', 'Napoletana', 'Acciughe Mozzarella Pomodoro', 8.0),
	('pc_olv','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_olv.jpg', 'Olive', 'Mozzarella Olive Pomodoro', 7.0),
	('pc_opr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_opr.jpg', 'Olive e Prosciutto', 'Mozzarella Olive Pomodoro Prosciutto Cotto', 9.0),
	('pc_ort','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_ort.jpg', 'Ortolana', 'Carciofini Funghi Melanzane Mozzarella Olive Peperoni Pomodoro Zucchine', 11.0),
	('pc_pmd','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_pmd.jpg', 'Pomodorini Freschi', 'Mozzarella Pomodorini Freschi ', 11.0),
	('pc_prc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_prc.jpg', 'Prosciutto Crudo', 'Mozzarella Pomodoro Prosciutto Crudo', 9.0),
	('pc_prs','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_prs.jpg', 'Prosciutto', 'Mozzarella Pomodoro Prosciutto Cotto', 12.0),
	('pc_ptp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_ptp.jpg', 'Patapizza', 'Mozzarella Patatine fritte Pomodoro', 7.0),
	('pc_qfr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_qfr.jpg', 'Quattro Formaggi', 'Fontina Gorgonzola Mozzarella Pomodoro Scamorza', 11.0),
	('pc_qtg','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_qtg.jpg', 'Quattro Stagioni', 'Funghi Mozzarella Olive Pomodoro Prosciutto Cotto', 10.0),
	('pc_rcl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_rcl.jpg', 'Rucola', 'Mozzarella Pomodoro Rucola', 10.0),
	('pc_rnp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_rnp.jpg', 'Rinforzata Napoletana', 'Acciughe Doppia Mozzarella Pomodoro', 9.0),
	('pc_rzp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_rzp.jpg', 'Rinforzata al Prosciutto', 'Doppia Mozzarella Pomodoro Prosciutto Cotto', 9.0),
	('pc_scc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_scc.jpg', 'Salsiccia', 'Mozzarella Pomodoro Salsiccia', 12.0),
	('pc_spc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_spc.jpg', 'Salame Piccante', 'Mozzarella Pomodoro Salame Piccante', 12.0),
	('pc_tnc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_tnc.jpg', 'Würstel', 'Mozzarella Pomodoro Würstel', 8.0),
	('pc_wrl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pc_wrl.jpg', 'Tonno e Carciofini', 'Carciofini Mozzarella Pomodoro Tonno', 8.0),
	('pg_ccr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_ccr.jpg', 'Speck e Brie', 'Brie Mozzarella Pomodoro Speck', 8.0),
	('pg_cpg','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_cpg.jpg', 'Cipolle e Gorgonzola', 'Cipolla Gorgonzola Mozzarella Pomodoro', 12.0),
	('pg_cpl','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_cpl.jpg', 'Cipolle e Capperi', 'Capperi Cipolla Mozzarella Pomodoro', 12.0),
	('pg_fpp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_fpp.jpg', 'Funghi Panna e Prosciutto', 'Funghi Mozzarella Panna Pomodoro Prosciutto Cotto', 12.0),
	('pg_ggp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_ggp.jpg', 'Gorgo e Pere', 'Gorgonzola Mozzarella Pere Pomodoro', 12.0),
	('pg_ggs','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_ggs.jpg', 'Gorgonzola e Speck', 'Gorgonzola Mozzarella Pomodoro Speck', 11.0),
	('pg_gpt','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_gpt.jpg', 'Gorgonzola e Pancetta', 'Gorgonzola Mozzarella Pancetta Pomodoro', 11.0),
	('pg_pcp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_pcp.jpg', 'Prosciutto Crudo e Parmigiano', 'Mozzarella Parmigiano Pomodoro Prosciutto Crudo', 11.0),
	('pg_ppr','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_ppr.jpg', 'Peperoni', 'Acciughe Mozzarella Peperoni Pomodoro', 10.0),
	('pg_qfc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_qfc.jpg', 'Quattro Formaggi e Crudo - Bianca', 'Fontina Gorgonzola Mozzarella Prosciutto Crudo Scamorza', 11.0),
	('pg_scf','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_scf.jpg', 'Salsiccia e Friarielli', 'Friarielli Mozzarella Pomodoro Salsiccia', 12.0),
	('pg_sgg','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_sgg.jpg', 'Salsiccia e Gorgonzola', 'Gorgonzola Mozzarella Pomodoro Salsiccia', 8.0),
	('pg_spc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_spc.jpg', 'Salame Piccante e Cipolla', 'Cipolla Mozzarella Pomodoro Salame Piccante', 10.0),
	('pg_stc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_stc.jpg', 'Stracchino', 'Mozzarella Pomodoro Stracchino', 11.0),
	('pg_wrg','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/pg_wrg.jpg', 'Wurstel e Gorgonzola', 'Gorgonzola Mozzarella Pomodoro Würstel', 10.0),
	('ps_czv','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_czv.jpg', 'Calzone alle Verdure', 'Carciofini Funghi Melanzane Mozzarella Olive Peperoni Pomodoro Zucchine', 7.0),
	('ps_fpc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_fpc.jpg', 'Funghi e Prosciutto Crudo', 'Funghi Mozzarella Pomodoro Prosciutto Crudo', 8.0),
	('ps_fpi','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_fpi.jpg', 'Funghi Porcini', 'Funghi porcini Mozzarella Pomodoro ', 11.0),
	('ps_fpp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_fpp.jpg', 'Funghi Panna e Peperoni', 'Funghi Mozzarella Panna Peperoni Pomodoro', 7.0),
	('ps_gmb','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_gmb.jpg', 'Gamberi*', 'Gamberi* Mozzarella Pomodorini Freschi Rucola', 12.0),
	('ps_mrp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_mrp.jpg', 'Mais Rucola e Parmigiano', 'Mais Mozzarella Parmigiano Pomodoro Rucola', 11.0),
	('ps_pfp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_pfp.jpg', 'Pomodorini Freschi e Prosciutto Crudo', 'Mozzarella Pomodorini Freschi Prosciutto Crudo ', 9.0),
	('ps_stc','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_stc.jpg', 'Salsiccia Toscana e Castelmagno', 'Castelmagno Mozzarella Pomodoro Salsiccia toscana', 9.0),
	('ps_stp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_stp.jpg', 'Salsiccia Toscana e Pecorino', 'Mozzarella Pecorino Pomodoro Salsiccia toscana', 9.0),
	('ps_sts','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_sts.jpg', 'Salsiccia Toscana', 'Mozzarella Pomodoro Salsiccia toscana ', 11.0),
	('ps_tor','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_tor.jpg', 'Tonno  Olive e Rucola', 'Mozzarella Olive Pomodoro Rucola Tonno', 11.0),
	('ps_trp','https://raw.githubusercontent.com/fornou/PRJ_PizzeriaDerubati/main/db/fotoProdotti/downloaded_images/ps_trp.jpg', 'Tropea', 'Cipolla rossa Mozzarella nduja Pomodoro', 7.0);
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- -------------------------------------------------------
-- 		Creazione viste per prodotti in base a codice
-- -------------------------------------------------------
CREATE VIEW vw_bibite AS
SELECT *
FROM ft_prodotti
where codProd like 'bb%';

CREATE VIEW vw_pizze AS
SELECT *
FROM ft_prodotti
where codProd like 'p%';

CREATE VIEW vw_pizze_golose AS
SELECT *
FROM ft_prodotti
where codProd like 'pg%';

CREATE VIEW vw_pizze_classiche AS
SELECT *
FROM ft_prodotti
where codProd like 'pc%';

CREATE VIEW vw_pizze_speciali AS
SELECT *
FROM ft_prodotti
where codProd like 'ps%';
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ------------------------------------------------------
-- 				Assegnamento randomico al prezzo
-- ------------------------------------------------------
update 
	prodotti
set 
	prezzo =  FLOOR(5 + (RAND() * 4))
where 
	codice like 'f%';
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ///////////////////////////////////////////////////////
-- ------------------------------------------------------
-- 			Seleziona in base all'inizio del
--					codice del prodotto
-- ------------------------------------------------------
-- Esso puo' essere di 5 tipi:
-- 	bb --> bibite
-- 	p --> pizze:
-- 			pg --> pizze golose
-- 			ps --> pizze speciali
-- 			pc --> pizze classiche
-- 	cz --> calzoni
-- 	fc --> focacce
-- ------------------------------------------------------
select 
	*
from
	ft_ordini
where 
	codice like 'p%';

-- -------------------------------------------------------
-- Conta elementi tabelle e viste
-- -------------------------------------------------------
select count(*) from prodotti;

-- 94 Prodotti totali:
-- 17 Bibite
-- 61 Pizze Totali ->  15 golose, 34 classiche, 12 speciali
-- 9 Focacce
-- 7 Calzoni
-- -------------------------------------------------------





