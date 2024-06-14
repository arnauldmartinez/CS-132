# Nursery API Documentation
*This API provides endpoints to retrieve information about plants in a local nursery. Information is inherently assumed to be stored in server-side directories.*

##
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a frequently asked question

**Supported Parameters** 
* `number` (required)
  * Index of the frequently asked question. Must be an integer from 1-5.

**Example Request:** GET /question/3

**Example Response:**

```json
{
    "text":"What are the best low-light plants?"
}
```

**Error Handling:**
Returns a 400 level error if the question number is not within the range 1 through 5.

Example: GET /question/8
Output:
```
Invalid question number
```

##
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns the answer to a frequently asked question

**Supported Parameters** 
* `number` (required)
  * Index of the answer to a frequently asked question. Must be an integer from 1-5.

**Example Request:** GET /answer/3

**Example Response:**

```json
{
    "text":"Some of the best low-light plants include snake plants, ZZ plants, and pothos."
}
```

**Error Handling:**
Returns a 400 level error if the answer number is not within the range 1 through 5.

Example: GET /answer/8
Output:
```
Invalid answer number
```

##
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a current promotion on the website

**Supported Parameters** 
* `number` (required)
  * Index of the promotion. Must be an integer from 1-5.

**Example Request:** GET /promotion/3

**Example Response:**

```json
{
    "text":"Free shipping on orders over $50!"
}
```

**Error Handling:**
Returns a 400 level error if the promotion number is not within the range 1 through 5.

Example: GET /promotion/8
Output:
```
Invalid promotion number
```

##
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns information about all available plants

**Supported Parameters** None

**Example Request:** GET /plant-info

**Example Response:**

```json
{
  "aloe": [
    "Aloe Vera is a cactus-like plant that thrives in hot and dry climates. The plant has historically been used topically and orally to improve acne, itches, burns, and rashes. Aloe has also been widely used as a dietary supplement.",
    20, "summer"
  ],
  "cactus": [
    "Cacti have adapted to live in extremely dry environments. They are well known for their pricks, which are leaves that help reduce water loss.",
    15, "summer"
  ],
  "caladium": [
    "Caladiums are known for their heart-shaped leaves, which come in various colors and sizes. They prefer warm, humid conditions and well-drained soil.",
    50, "summer"
  ],
  "cherry": [
    "Cherry trees produce small, sweet fruit during the spring time. They are culturally significant in Japan and, according to locals, contain the most beautiful flowers.",
    80, "winter"
  ],
  "chive": [
    "Chives are an herb related to onions and garlic. They are often used as culinary items. They are edible and can be used in salads or garnish.",
    20, "summer"
  ],
  "daisy": [
    "Daisies are common wildflowers that are often found in lawns and meadows. They are a prototype flower, containing a simple central disk with ray florets.",
    40, "summer"
  ],
  "fern": [
    "Ferns are a group of vascular plants that grow in shaded damp forests and tropical zones. They reproduce via spores and are provide ample shade near the ground.",
    20, "winter"
  ],
  "hosta": [
    "Hostas are shade-tolerant plants known for their extensive foliage. They come in a variety of colors and patterns, and are popular for garden landscaping.",
    15, "winter"
  ],
  "hyacinth": [
    "Hyacinths are bulbous plants known for their highly fragrant and colorful flowers. They are native to the eastern Mediterranean region and are popular in gardens and as indoor plants.",
    90, "winter"
  ],
  "lotus": [
    "The lotus is an aquatic plant known for its large flowers and leaves. It can grow in muddy water, with its flowers rising above the water. It symbolizes purity and enlightenment in many cultures.",
    100, "summer"
  ],
  "lupine": [
    "Lupines are flowering plants known for their tall spikes of flowers. They fix nitrogen in the soil, improving fertility for nearby plants. They are often found in meadows and are popular in outdoor gardens.",
    50, "summer"
  ],
  "rose": [
    "Roses are among the most popular and widely cultivated flower, known for their vibrant colors and fragrances. They are used in perfumes, cosmetics, and as ornamental pieces in gardens and bouquets.",
    70, "summer"
  ],
  "soapwart": [
    "Soapwarts are known for their soap-like qualities. It is often used in herbal medicine and natural cleaning products. They also produce small white flowers when they bloom.",
    50, "summer"
  ],
  "sunflower": [
    "Sunflowers are known for their large, bright yellow flowers and brown center. They noticeably track the sun's location during the day. They also produce seeds that are rich in oil and nutrients.",
    50, "summer"
  ],
  "tulip": [
    "Tulips are spring-blossoming plants that have vibrantly-colored flowers. They are native to central Asia and the Netherlands. In many cultures, tulips are associated with love and rebirth.",
    70, "winter"
  ]
}
```

##
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns information about a specific plant

**Supported Parameters** 
* `name` (required)
  * Plant name

**Example Request:** GET /plant-info/daisy

**Example Response:**

```json
{[
  "Daisies are common wildflowers that are often found in lawns and meadows. They are a prototype flower, containing a simple central disk with ray florets.",
  40, "summer"
]}
```

**Error Handling:**
Returns a 400 level error if the plant name is not a plant supplied by the nursery

Example: GET /plant-info/mint
Output:
```
Invalid plant number
```

##
**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a list of plants that can grow in a given season

**Supported Parameters** 
* `season` (required)
  * Name of the season

**Example Request:** GET /plant-filter/summer

**Example Response:**

```json
{
  "items": [
    "aloe",
    "cactus",
    "caladium",
    "chive",
    "daisy",
    "lotus",
    "lupine",
    "rose",
    "soapwart",
    "sunflower"
  ]
}
```

**Error Handling:**
Returns a 400 level error if the input is not 'summer' or 'winter'

Example: GET /plant-info/spring
Output:
```
invalid filter, must be 'summer' or 'winter'
```

##
**Request Type:** POST

**Returned Data Format**: text

**Description:** Adds a message to a server-side file

**Supported Parameters** 
* POST body parameters
  * `first` (required) - first name
  * `last` (required) - last name
  * `phone` (required) - phone number
  * `email` (required) - email address
  * `message` (required) - message content

**Example Request:** POST /addMessage 
```json
{
    first : "Arnauld",
    last : "Martinez",
    phone : "510-730-9853",
    email : "arnauldmartinez@gmail.com",
    message : "hello"
}
```

**Example Response:**

```
Request to add Arnauld's message to file successfully received!
```

**Error Handling:**
Returns a 500 level error if the output file does not exist

Example: POST /addMessage 
```json
{
    first : "Arnauld",
    last : "Martinez",
    phone : "510-730-9853",
    email : "arnauldmartinez@gmail.com",
    message : "hello"
}
```
Output:
```
server error
```

##
**Request Type:** POST

**Returned Data Format**: text

**Description:** Adds all items in the cart to a file. Note, if the cart is empty, it will write an empty basket to the file.

**Supported Parameters** 
* POST body parameters
  * `plantNames` (required) - list of plants in the cart

**Example Request:** POST /addMessage 
```json
{
    plantNames : ["aloe", "daisy", "cactus"]
}
```

**Example Response:**

```
Successfully sent to the manufacturer!
```

**Error Handling:**
Returns a 500 level error if the output file does not exist

Example: POST /addMessage 
```json
{
    plantNames : ["aloe", "daisy", "cactus"]
}
```

Output:
```
server error
```