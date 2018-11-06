import * as property from './property.json'

import { Cats } from './cats'

/*
Initialising the application
*/
const cat = new Cats(property)

/*
Calling application method
*/
cat.init()