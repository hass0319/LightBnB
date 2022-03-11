
INSERT INTO users(name, email, password)
	VALUES('amro', 'animal@abyss.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
	('perry', 'baby@blower.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
	('kimchy', 'corner@cam.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
	('ahma', 'dummy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
-- password
INSERT INTO  properties(owner_id, title, description, tumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
	VALUES(1, 'Frechy', 'description', 'https://webecoist.momtastic.com/assets/uploads/2011/12/fairytale-cottages-queens-hamlet.jpg', 'https://en.chateauversailles.fr/sites/default/files/hdr1.jpg', 10000, 20, 20, 50, 'France', '78000 Versailles', 'Paris', 'N/A', 'R43C+W4', true),
	(2, 'Cutsey', 'description', 'https://www.homestratosphere.com/wp-content/uploads/2014/03/victorian-mansion-asturias-spain-090618-2.jpg', 'https://www.homestratosphere.com/wp-content/uploads/2018/09/Gingerbread-style-Victorian-era-home-sept14.jpg', 400, 10, 2, 10, 'spain', '10 wood and stone', 'Austria', 'Austria', '2P4 T9p', true),
	(3, 'oixy', 'description', 'https://img.dtcn.com/image/themanual/pic-chalet-3-featured-800x533.jpg', 'http://www.appareilarchitecture.com/wp-content/uploads/APPAREILarchitecture_Chalet-GRAND-PIC_Austin_2017_%C2%A9F%C3%A9lix-Michaud_.jpg', 1000, 2, 2, 1, 'Mycountry', '69 comfy', 'comestay', 'holdme', 'B0B 1E3', true),
	(4, 'michy', 'description', 'https://a0.muscache.com/pictures/96390751/761d4295_original.jpg', 'https://a0.muscache.com/im/pictures/96390415/7602d79e_original.jpg?im_w=720', 3000, 3, 2, 4, 'Entry', '53 wabeana', 'bewana', 'wanabe', 'h5G 8E6', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
	VALUES ('2018-09-11', '2018-09-26', 1, 1),
	('2019-01-04', '2019-02-01', 2, 2),
	('2021-10-01', '2021-10-14', 3, 3),
	('2018-09-10', '2018-10-14', 4, 4);

INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
	VALUES(1, 3,  5, 10, 'messages'),
	(3, 5, 7, 9, 'messages'),
	(2, 7, 12, 8, 'messages'),
	(4, 9, 8, 9, 'messages');