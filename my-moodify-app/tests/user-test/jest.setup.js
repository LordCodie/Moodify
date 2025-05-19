/**
 * @jest-environment jsdom
 */
// rest of your test…

require('fake-indexeddb/auto')

if (typeof structuredClone === 'undefined') {
    global.structuredClone = obj => JSON.parse(JSON.stringify(obj))
}

const { openDB, deleteDB } = require('idb')

// look up ip geo location (test-later)
const lookupIPGeo = async () => {
    try {
        const r = await fetch(`https://ipapi.co/json/`)
        if (!r.ok) throw new Error()
        const { country_code: country } = await r.json()
        return { country }
    } catch (error) {
        return { country: 'US' }
    }
}

// Returns the user's IANA timezone string
const getUserTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || undefined
}

// create a Date in the right zone (browser only)
const getTimeBucket = (timeZone) => {
    const now = timeZone ? new Date(new Date().toLocaleString('en-US', { timeZone })) : new Date()

    const hour = now.getHours()
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night'
}

// ------------------------ IndexedDB -------------------------------------------------

const DB_NAME = 'my-db'
const STORE = 'past requests'
const DB_VERSION = 1

const getDb = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore('past requests', { keyPath: 'created', autoIncrement: true })
            }
        }
    })
}

const addToIndex = async (artist, genre) => {
    try {
        const db = await getDb()
        await db.add(STORE,
            {
                createdAt: new Date().toISOString(),
                requests: [artist, genre]
            }
        )
        return 'Successfully added to IndexedDB'
    } catch (error) {
        console.error('addToIndex error:', error)
        return undefined
    }
}

const readIndex = async () => {
    try {
        const db = await getDb()
        return await db.getAll(STORE)
    } catch (error) {
        console.error('readIndex error:', error)
        return undefined
    }
}

const clearDb = async () => {
    await deleteDB(DB_NAME)
}

module.exports = { lookupIPGeo, getUserTimeZone, getTimeBucket, addToIndex, readIndex }
