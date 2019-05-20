

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
		return this.collection.insert.apply(this.collection, arguments);
	}

	remove() {
		return this.collection.remove.apply(this.collection, arguments);
	}

	rename() {
		return this.collection.rename.apply(this.collection, arguments);
	}

	save() {
		return this.collection.save.apply(this.collection, arguments);
	}

	update() {
		return this.collection.update.apply(this.collection, arguments);
	}

	distinct() {
		return this.collection.distinct.apply(this.collection, arguments);
	}

	count() {
		return this.collection.count.apply(this.collection, arguments);
	}

	drop() {
		return this.collection.drop.apply(this.collection, arguments);
	}

	findAndModify() {
		return this.collection.findAndModify.apply(this.collection, arguments);
	}

	findAndRemove() {
		return this.collection.findAndRemove.apply(this.collection, arguments);
	}

	find() {
		return this.collection.find.apply(this.collection, arguments);
	}

	findOne() {
		return this.collection.findOne.apply(this.collection, arguments);
	}

	createIndex() {
		return this.collection.createIndex.apply(this.collection, arguments);
	}

	ensureIndex() {
		return this.collection.ensureIndex.apply(this.collection, arguments);
	}

	indexInformation() {
		return this.collection.indexInformation.apply(this.collection, arguments);
	}

	dropIndex() {
		return this.collection.dropIndex.apply(this.collection, arguments);
	}

	dropAllIndexes() {
		return this.collection.dropAllIndexes.apply(this.collection, arguments);
	}

	reIndex() {
		return this.collection.reIndex.apply(this.collection, arguments);
	}

	mapReduce() {
		return this.collection.mapReduce.apply(this.collection, arguments);
	}

	group() {
		return this.collection.group.apply(this.collection, arguments);
	}

	options() {
		return this.collection.options.apply(this.collection, arguments);
	}

	isCapped() {
		return this.collection.isCapped.apply(this.collection, arguments);
	}

	indexExists() {
		return this.collection.indexExists.apply(this.collection, arguments);
	}

	geoNear() {
		return this.collection.geoNear.apply(this.collection, arguments);
	}

	geoHaystackSearch() {
		return this.collection.geoHaystackSearch.apply(this.collection, arguments);
	}

	indexes() {
		return this.collection.indexes.apply(this.collection, arguments);
	}

	aggregate() {
		return this.collection.aggregate.apply(this.collection, arguments);
	}

	stats() {
		return this.collection.stats.apply(this.collection, arguments);
	}

	initializeUnorderedBulkOp() {
		return this.collection.initializeUnorderedBulkOp.apply(this.collection, arguments);
	}

	initializeOrderedBulkOp() {
		return this.collection.initializeOrderedBulkOp.apply(this.collection, arguments);
	}

	parallelCollectionScan() {
		return this.collection.parallelCollectionScan.apply(this.collection, arguments);
	}
}

export {
    AbstractCollection
};


//["Constructor","insert","remove","rename","save","update","distinct","count","drop","findAndModify","findAndRemove","find","findOne","createIndex","ensureIndex","indexInformation","dropIndex","dropAllIndexes","reIndex","mapReduce","group","options","isCapped","indexExists","geoNear","geoHaystackSearch","indexes","aggregate","stats","initializeUnorderedBulkOp","initializeOrderedBulkOp","parallelCollectionScan"]