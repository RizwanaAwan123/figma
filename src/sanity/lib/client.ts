import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

import { apiVersion, dataset, projectId } from '../env'


dotenv.config()
 const client = createClient({
  projectId:"a6v3tvko",
  dataset: "production",
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
 export default client