import { MongoClient } from 'mongodb'

declare global {
  /* eslint no-var: */
  var _mongoClientPromise: Promise<MongoClient>
}
