# App API Documentation
The app API gives users information about Lloyd, Venerable, and Bechtel at Caltech. Lloyd and Venerable are undergraduate houses with different cultures and traditions, while Bechtel is an undergraduate residence.

## Get House
**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns information about the undergraduate houses at Caltech

**Supported Parameters** 
* `name` (required)
  * Name of the undergraduate house. Must be "lloyd" or "venerable"

**Example Request:** GET /houses/lloyd

**Example Response:**

```
Lloyd house is one of the eight undergraduate houses at Caltech. It was built in honor of Ralph and Lulu Lloyd in 1960. Today, the house is a cornerstone of undergraduate life. Full and social members of the house participate in camping, skiing, and beach trips! Smaller events occur on a weekly basis, while unofficial events happen nearly every day.
```

**Error Handling:**
Returns a 400 error if an invalid house name is specified

Example: GET /houses/lululloyd
Output:
```
Error: Undergraduate house must be lloyd or venerable
```

## Get Residence
**Request Format:** GET

**Returned Data Format**: JSON

**Description:** Returns information about Bechtel residence at Caltech

**Supported Parameters** None

**Example Request:** GET /houses/bechtel

**Example Response:**

```json
{
  "text": "Bechtel is the only undergraduate residence on Caltech's campus. It was built for students who are not affiliated with a house. However, since the facilities are nicer in Bechtel than in Lloyd or Venerable, people are unaffiliating to live in a nicer room. This is the cause of the recent housing crisis."
}
```

**Error Handling:** No specific error handling since the path does not require parameters.