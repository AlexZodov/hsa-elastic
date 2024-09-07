# hsa-elastic
HSA homework elasticsearch

# Task
Create ES index that will serve autocomplete needs with leveraging typos and errors (max 3 typos if word length is bigger than 7).
Please use english voc. Ang look at google as a ref.

## How to start
1. Clone the repo to local machine
2. Head to `./server` on local machine and run `npm install` (required once to create node_modules folder before it will be projected to inner docker container filesystem)
3. Head to root of the cloned repo
4. Run `docker-compose up -d`
5. Wait for service messages in container console to finish project building
   1. ```
      Deleting existing index 'autocomplete'...
      Deleted
      Creating fresh index 'autocomplete'...
      Created
      Populating index 'autocomplete' with dataset
      Populated with 370100 items
      ``` 
      This logs mean that on each server restart it deletes existing index in elasticsearch, creates new one and populates it with values from given dictionary dataset

## How to test
1. Interact with endpoint GET `localhost:9999/api/v1/unit-1/autocomlete/<YOUR_SEARCH_VALUE_HERE>`
2. Observe results
   3. `localhost:9999/api/v1/unit-1/autocomplete/test` 
   4. ```
      {
         "total": 1252,
         "top_10_matches": [
            "testa",
            "testability",
            "testable",
            "testacea",
            "testacean",
            "testaceography",
            "testaceology",
            "testaceous",
            "testaceousness",
            "testacy"
         ]
      }
      ```
