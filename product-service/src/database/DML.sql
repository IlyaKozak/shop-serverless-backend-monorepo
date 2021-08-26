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

INSERT INTO stocks (product_id, count)
VALUES
(
  (SELECT id FROM products WHERE title = 'Ibanez GIO'),
  4
),
(
  (SELECT id FROM products WHERE title = 'Kramer Assault'),
  6
),
(
  (SELECT id FROM products WHERE title = 'Mitchell MD200'),
  7
),
(
  (SELECT id FROM products WHERE title = 'Rogue RR100'),
  12
),
(
  (SELECT id FROM products WHERE title = 'GIBSON Les Paul'),
  7
),
(
  (SELECT id FROM products WHERE title = 'CORT KX300'),
  8
),
(
  (SELECT id FROM products WHERE title = 'Schecter Omen'),
  2
),
(
  (SELECT id FROM products WHERE title = 'YAMAHA Pacifica'),
  3
);
