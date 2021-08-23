INSERT INTO products (title, description, price, src)
VALUES
(
	'Ibanez GIO',
	'Ibanez GIO GRG121DX-BKF',
	285.57,
	'https://images.unsplash.com/photo-1562092083-bf2848da4bcd?&w=500'
),
(
	'Kramer Assault',
	'Kramer Assault 220 Electric Guitar',
	380.00,
	'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?&w=500'
),
(
	'Mitchell MD200',
	'Mitchell MD200 Double-Cutaway',
	199.00,
	'https://images.unsplash.com/photo-1508186736123-44a5fcb36f9f?&w=500'
),
(
	'Rogue RR100',
	'Rogue RR100 Rocketeer',
	119.99,
	'https://images.unsplash.com/photo-1550985616-10810253b84d?&w=500'
),
(
	'GIBSON Les Paul',
	'GIBSON Les Paul Special Tribute P-90 Vintage Cherry Satin',
	965.00,
	'https://images.unsplash.com/photo-1568193755668-aae18714a9f1?&w=500'
),
(
	'CORT KX300',
	'CORT KX300 E-Gitarre Open Pore Raw Burst',
	418.00,
	'https://images.unsplash.com/photo-1601956349582-ba50bedaa8ea?&w=500'
),
(
	'Schecter Omen',
	'Schecter Omen 6',
	439.00,
	'https://images.unsplash.com/photo-1605227641821-d82507f46436?&w=500'
),
(
	'YAMAHA Pacifica',
	'YAMAHA Pacifica 112J',
	229.00,
	'https://images.unsplash.com/photo-1587898427355-5d8f51725d13?&w=500'
);

-- product_id taken from products.id
INSERT INTO stocks (product_id, count)
VALUES
(
  '5123899e-72cd-4045-8d57-c7f3d0e73bf2',
  4
),
(
  '24626ec9-d1ed-4c12-9754-333c8a990929',
  6
),
(
  'dfcdf25c-d5fd-47f0-b143-6a3b2de81135',
  7
),
(
  '0f862a28-7fab-4fbf-ad00-5b2658be6c17',
  12
),
(
  '18500392-f1ea-4572-a1e5-e4b261330876',
  7
),
(
  '153c082e-ad00-46f6-aa04-c85df9e82789',
  8
),
(
  'fcd5ff09-94b0-473c-b1ae-9a794a7ae9f8',
  2
),
(
  '8ba8d824-0a77-4159-a5a0-8d8e777e0af0',
  3
);
