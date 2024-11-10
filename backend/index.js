

const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Import the cors package
const prisma = new PrismaClient(); // Initialize Prisma Client
app.use(express.json());
app.use(cors())
// Allow all domains to access your backend

// -------- Farmer Routes --------
const authenticateFarmer = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the farmer's ID to the request object for further use in routes
        req.farmerId = decoded.id;

        // Optionally, check if the user exists in the database (not mandatory)
        const farmer = await prisma.farmer.findUnique({ where: { id: decoded.id } });

        if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

const authenticateFactoryOfficial = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the factory's ID and role to the request object for further use in routes
        req.factoryOfficialId = decoded.id;
        req.role = decoded.role;

        // Optionally, check if the factory official exists in the database (not mandatory)
        const factoryOfficial = await prisma.factoryOfficial.findUnique({ where: { id: decoded.id } });

        if (!factoryOfficial) {
            return res.status(404).json({ error: 'Factory official not found' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

// Register Route
app.post('/farmers/register', async (req, res) => {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password || !location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newFarmer = await prisma.farmer.create({
            data: {
                name,
                email,
                password: hashedPassword,  // Store hashed password
                location
            }
        });

        res.status(201).json(newFarmer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering farmer' });
    }
});

// Login Route
app.post('/farmers/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        let user = await prisma.farmer.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        // Compare the hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token without 'role' field
        const token = jwt.sign(
            { id: user.id },  // Payload: only the user ID
            process.env.JWT_SECRET,  // Secret key (from .env)
            { expiresIn: '1h' }  // Token expiration time (1 hour)
        );

        res.status(200).json({
            message: "Login successful",
            token,
            username: user.name

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/factory-officials/register', async (req, res) => {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password || !location) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newFactoryOfficial = await prisma.factoryOfficial.create({
            data: {
                name,
                email,
                password: hashedPassword,  // Store hashed password
                location
            }
        });

        res.status(201).json(newFactoryOfficial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering factory official' });
    }
});

// Factory Official Login Route
app.post('/factory-officials/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        let user = await prisma.factoryOfficial.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({ error: "Factory official not found" });
        }

        // Compare the hashed password with the provided password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id },  // Payload: user ID and role
            process.env.JWT_SECRET,                     // Secret key (from .env)
            { expiresIn: '1h' }                        // Token expiration time (1 hour)
        );


        res.status(200).json({
            message: "Login successful",
            useremail: user.email,
            token,
            username: user.name,
            // factoryofficialId:user.id,

        })

        // console.log('Token:', token);
        // console.log('User Email:', useremail);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/farmers/my-crops', authenticateFarmer, async (req, res) => {
    const farmerId = req.farmerId; // Get the farmer's ID from the JWT payload

    try {
        // Fetch the crops associated with the farmer
        const crops = await prisma.crop.findMany({
            where: {
                farmerId: farmerId, // Only fetch crops for the logged-in farmer
            },
        });

        if (crops.length === 0) {
            return res.status(404).json({ message: 'No crops found for this farmer.' });
        }

        res.status(200).json(crops); // Return the list of crops
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching crops' });
    }
});


app.post('/farmers/crops', authenticateFarmer, async (req, res) => {
    const { name, quantity, price, description, harvestDate } = req.body;
    const farmerId = req.farmerId;

    // Check if all required fields are present
    if (!name || !quantity || !price || !harvestDate) {
        return res.status(400).json({ error: 'Crop name, quantity, price, and harvest date are required' });
    }

    // Convert quantity and price to numbers
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);
    const parsedHarvestDate = new Date(harvestDate);

    // Validate the parsed values
    if (isNaN(parsedQuantity) || isNaN(parsedPrice) || isNaN(parsedHarvestDate)) {
        return res.status(400).json({ error: 'Invalid data type for quantity, price, or harvest date' });
    }

    try {
        // Create the new crop
        const newCrop = await prisma.crop.create({
            data: {
                name,
                quantity: parsedQuantity,
                price: parsedPrice,
                description,
                harvestDate: parsedHarvestDate,
                farmerId: farmerId
            }
        });

        res.status(201).json(newCrop); // Return the created crop data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering crop' });
    }
});
app.post('/factory-officials/buy-crop/:cropId', authenticateFactoryOfficial, async (req, res) => {
    const { cropId } = req.params;
    const { quantity } = req.body; // The quantity that the factory official wants to buy
    const factoryOfficialId = req.factoryOfficialId; // ID of the authenticated factory official

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
    }

    try {
        // Fetch the crop from the database
        const crop = await prisma.crop.findUnique({
            where: { id: cropId },
            include: { farmer: true } // Include the farmer data for reference
        });

        if (!crop) {
            return res.status(404).json({ error: 'Crop not found' });
        }

        if (crop.quantity < quantity) {
            return res.status(400).json({ error: 'Not enough quantity available' });
        }

        // Calculate the total price
        const totalPrice = crop.price * quantity;

        // Create a purchase record (this can be a separate model or just a transaction)
        const purchase = await prisma.purchase.create({
            data: {
                cropId: crop.id,
                quantity,
                totalPrice,
                factoryOfficialId,
                farmerId: crop.farmerId, // Store the farmer's ID who owns the crop
            }
        });

        // Update the crop's quantity
        await prisma.crop.update({
            where: { id: crop.id },
            data: { quantity: crop.quantity - quantity }, // Subtract the purchased quantity
        });

        res.status(200).json({ message: 'Purchase successful', purchase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing purchase' });
    }
});


app.get('/factory-officials/crops', authenticateFactoryOfficial, async (req, res) => {
    try {
        const products = await prisma.crop.findMany({
            include: {
                farmer: { select: { name: true, email: true, location: true } }
            }
        });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found.' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// In your backend routes file (e.g., factoryRoutes.js)

app.post('/factory-official/buy-crop', authenticateFactoryOfficial, async (req, res) => {
    const { cropId, quantity, useremail } = req.body;

    if (!cropId || !quantity) {
        return res.status(400).json({ error: "Crop ID and quantity are required" });
    }

    try {
        // Fetch the crop to check availability
        const crop = await prisma.crop.findUnique({
            where: { id: cropId },
        });

        if (!crop) {
            return res.status(404).json({ error: "Crop not found" });
        }

        // Check if the requested quantity is available
        if (crop.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient crop quantity" });
        }

        // Deduct the quantity from the crop
        const updatedCrop = await prisma.crop.update({
            where: { id: cropId },
            data: {
                quantity: crop.quantity - quantity, // Reduce crop quantity
            },
        });

        // Find the factory official by email (getting the id using useremail)
        const factoryOfficial = await prisma.factoryOfficial.findUnique({
            where: { email: useremail }, // Use email to fetch the factory official
        });

        if (!factoryOfficial) {
            return res.status(404).json({ error: "Factory Official not found" });
        }

        // Calculate the total cost
        // const totalCost = crop.price * quantity;

        // Create a purchase record using factoryOfficial.id (not email)
        const purchase = await prisma.purchase.create({
            data: {
                factoryOfficialId: factoryOfficial.id, // Use factory official's id
                cropId: crop.id,
                quantity,
                // totalCost,  // Save the calculated total cost
                purchaseDate: new Date(),
            },
        });

        // Return a success response with the purchase and updated crop details
        res.status(200).json({ message: "Crop purchased successfully", purchase, crop: updatedCrop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing purchase" });
    }
});

app.get('/factory-official/purchases', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        // Fetch the factory official by email
        const factoryOfficial = await prisma.factoryOfficial.findUnique({
            where: { email },
            include: {
                purchases: {
                    include: {
                        crop: true,
                    },
                },
            },
        });

        if (!factoryOfficial) {
            return res.status(404).json({ error: "Factory official not found" });
        }

        if (factoryOfficial.purchases.length === 0) {
            return res.status(404).json({ message: 'No crops purchased.' });
        }

        // Return the list of purchases with crop details and total cost
        return res.json(factoryOfficial.purchases.map(purchase => ({
            cropName: purchase.crop.name,
            quantity: purchase.quantity,
            purchaseDate: purchase.purchaseDate,
            price: purchase.crop.price,
            // totalCost: purchase.totalCost, // Include total cost
        })));
    } catch (error) {
        console.error('Error fetching purchases:', error);
        res.status(500).json({ message: 'Error fetching purchased crops.' });
    }
});

// Start the server


// app.get('/farmers/:farmerId', async (req, res) => {
//     try {
//         const { farmerId } = req.params;

//         // Extract the token from the Authorization header
//         const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

//         if (!token) {
//             return res.status(401).json({ error: 'Authorization required' });
//         }

//         // Verify the JWT token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Check if the farmerId in the token matches the one in the URL
//         if (decoded.id !== parseInt(farmerId)) {
//             return res.status(403).json({ error: 'You are not authorized to view this profile' });
//         }

//         // If token is valid and farmerId matches, fetch the farmer's profile
//         const farmer = await prisma.farmer.findUnique({
//             where: { id: parseInt(farmerId) },
//         });

//         if (!farmer) {
//             return res.status(404).json({ error: 'Farmer not found' });
//         }

//         return res.json(farmer);
//     } catch (error) {
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // -------- Crop Routes --------
// app.post('/crops', async (req, res) => {
//     const { name, description, quantity, price, farmerId } = req.body;
//     try {
//         const newCrop = await prisma.crop.create({
//             data: { name, description, quantity, price, farmerId }
//         });
//         res.status(201).json(newCrop);
//     } catch (error) {
//         res.status(500).json({ error: 'Error adding crop' });
//     }
// });

// app.get('/crops', async (req, res) => {
//     const crops = await prisma.crop.findMany();
//     res.json(crops);
// });

// // -------- Factory Routes --------
// app.post('/factory/register', async (req, res) => {
//     const { name, email, password, location } = req.body;
//     try {
//         const newFactory = await prisma.factoryOfficial.create({
//             data: { name, email, password, location }
//         });
//         res.status(201).json(newFactory);
//     } catch (error) {
//         res.status(500).json({ error: 'Error registering factory official' });
//     }
// });

// app.post('/factory/login', async (req, res) => {
//     const { email, password } = req.body;
//     // Logic for factory official login authentication
// });

// // -------- Order Routes ----
// app.post('/orders', async (req, res) => {
//     const { cropId, factoryId, quantity, totalPrice } = req.body;
//     try {
//         const newOrder = await prisma.order.create({
//             data: { cropId, factoryId, quantity, totalPrice }
//         });
//         res.status(201).json(newOrder);
//     } catch (error) {
//         res.status(500).json({ error: 'Error placing order' });
//     }
// });

// app.get('/orders', async (req, res) => {
//     const orders = await prisma.order.findMany();
//     res.json(orders);
// });

app.listen(3002, (err, res) => {
    if (!err) {
        console.log("server running on port 3002")
    }
    else {
        console.log(err)
    }
})