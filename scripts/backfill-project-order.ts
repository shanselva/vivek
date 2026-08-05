import { connectDB } from '../lib/db';
import { Project } from '../lib/models/Project';

/**
 * One-off migration: give every pre-existing project an explicit `order`.
 *
 * Projects created before the display-order feature have no `order` field at all.
 * MongoDB sorts missing values ahead of 0 on an ascending sort, so without this
 * backfill those older projects would jump to the front of the portfolio.
 * Setting them all to 0 leaves the public ordering exactly as it is today —
 * they keep falling through to the `createdAt: -1` tiebreak.
 */
async function backfillProjectOrder() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database.');

    const result = await Project.updateMany(
      { order: { $exists: false } },
      { $set: { order: 0 } }
    );

    console.log(`Backfilled display order on ${result.modifiedCount} project(s).`);
    process.exit(0);
  } catch (error) {
    console.error('Error backfilling project order:', error);
    process.exit(1);
  }
}

backfillProjectOrder();
