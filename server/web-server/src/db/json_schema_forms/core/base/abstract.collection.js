

export default class AbstractCollection {

    constructor() {
        this.initialize();
    }

    initialize() {
        this.collectionName = '';
    }

    postInit() {
        global.SERVER.DB.CONNECTION.collection(this.collectionName, (err, collection) => {
            this.collection = collection;
        });
    }

    insert() {
		try {
			return this.collection.insert.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	remove() {
		try {
			return this.collection.remove.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	rename() {
		try {
			return this.collection.rename.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	save() {
		try {
			return this.collection.save.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	update() {
		try {
			return this.collection.update.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	distinct() {
		try {
			return this.collection.distinct.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	count() {
		try {
			return this.collection.count.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	drop() {
		try {
			return this.collection.drop.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	findAndModify() {
		try {
			return this.collection.findAndModify.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	findAndRemove() {
		try {
			return this.collection.findAndRemove.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	find() {
		try {
			return this.collection.find.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	findOne() {
		try {
			return this.collection.findOne.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	createIndex() {
		try {
			return this.collection.createIndex.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	ensureIndex() {
		try {
			return this.collection.ensureIndex.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	indexInformation() {
		try {
			return this.collection.indexInformation.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	dropIndex() {
		try {
			return this.collection.dropIndex.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	dropAllIndexes() {
		try {
			return this.collection.dropAllIndexes.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	reIndex() {
		try {
			return this.collection.reIndex.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	mapReduce() {
		try {
			return this.collection.mapReduce.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	group() {
		try {
			return this.collection.group.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	options() {
		try {
			return this.collection.options.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	isCapped() {
		try {
			return this.collection.isCapped.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	indexExists() {
		try {
			return this.collection.indexExists.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	geoNear() {
		try {
			return this.collection.geoNear.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	geoHaystackSearch() {
		try {
			return this.collection.geoHaystackSearch.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	indexes() {
		try {
			return this.collection.indexes.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	aggregate() {
		try {
			return this.collection.aggregate.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	stats() {
		try {
			return this.collection.stats.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	initializeUnorderedBulkOp() {
		try {
			return this.collection.initializeUnorderedBulkOp.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	initializeOrderedBulkOp() {
		try {
			return this.collection.initializeOrderedBulkOp.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}

	parallelCollectionScan() {
		try {
			return this.collection.parallelCollectionScan.apply(this.collection, arguments);
		} catch(error) {
			SERVER.LOGGER.logError(error);
			return null;
		}
		
	}
}

export {
    AbstractCollection
};


//["insert","remove","rename","save","update","distinct","count","drop","findAndModify","findAndRemove","find","findOne","createIndex","ensureIndex","indexInformation","dropIndex","dropAllIndexes","reIndex","mapReduce","group","options","isCapped","indexExists","geoNear","geoHaystackSearch","indexes","aggregate","stats","initializeUnorderedBulkOp","initializeOrderedBulkOp","parallelCollectionScan"]