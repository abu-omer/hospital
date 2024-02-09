// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { NextFunction } from 'express';
// import * as bcrypt from 'bcryptjs'


// @Injectable()
// export class HashpasswordMiddleware implements NestMiddleware {
//   async use(req: Request, res: Response, next: NextFunction) {
//     if (req.password) {
//       const hash = await bcrypt.hash(password, 10);
//     }
//     next();
//   }
// }
