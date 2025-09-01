# Database Design - MusicApp 🗄️

This document outlines the database design and schema for the MusicApp project, which uses MongoDB as the primary database with Mongoose ODM.

## 📊 Database Overview

- **Database Type**: MongoDB (NoSQL)
- **ODM**: Mongoose
- **Connection**: Environment-based configuration
- **Collections**: 4 main collections with relationships

## 🏗️ Entity Relationship Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Topics      │    │      Songs      │    │     Singers     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ _id (ObjectId)  │    │ _id (ObjectId)  │    │ _id (ObjectId)  │
│ title (String)  │◄───┤ topicId (String)│    │ fullName (String)│
│ avatar (String) │    │ singerId (String)│───►│ avatar (String) │
│ description     │    │ title (String)  │    │ status (String) │
│ status (String) │    │ avatar (String) │    │ slug (String)   │
│ slug (String)   │    │ description     │    │ deleted (Bool)  │
│ deleted (Bool)  │    │ lyrics (String) │    │ deletedAt (Date)│
│ deletedAt (Date)│    │ audio (String)  │    │ timestamps      │
│ timestamps      │    │ like (Number)   │    └─────────────────┘
└─────────────────┘    │ listen (Number) │
                       │ status (String) │
                       │ slug (String)   │
                       │ deleted (Bool)  │
                       │ deletedAt (Date)│
                       │ timestamps      │
                       └─────────────────┘
                                │
                                │
                       ┌─────────────────┐
                       │ Favorite Songs  │
                       ├─────────────────┤
                       │ _id (ObjectId)  │
                       │ userId (String) │
                       │ songId (String) │◄───┘
                       │ deleted (Bool)  │
                       │ deletedAt (Date)│
                       │ timestamps      │
                       └─────────────────┘
```

## 📋 Collection Schemas

### 1. Topics Collection (`topics`)

**Purpose**: Categorize songs into different genres or themes.

```typescript
{
  _id: ObjectId,           // Primary key
  title: String,           // Topic name (e.g., "Pop", "Rock", "Jazz")
  avatar: String,          // Topic cover image URL
  description: String,     // Topic description
  status: String,          // "active" | "inactive"
  slug: String,            // URL-friendly identifier
  deleted: Boolean,        // Soft delete flag (default: false)
  deletedAt: Date,         // Deletion timestamp
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes**:
- `{ slug: 1 }` - Unique index for URL routing
- `{ status: 1, deleted: 1 }` - Compound index for active topics

### 2. Singers Collection (`singers`)

**Purpose**: Store artist/band information.

```typescript
{
  _id: ObjectId,           // Primary key
  fullName: String,        // Artist/band name
  avatar: String,          // Artist photo URL
  status: String,          // "active" | "inactive"
  slug: String,            // URL-friendly identifier
  deleted: Boolean,        // Soft delete flag (default: false)
  deletedAt: Date,         // Deletion timestamp
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes**:
- `{ slug: 1 }` - Unique index for URL routing
- `{ status: 1, deleted: 1 }` - Compound index for active singers

### 3. Songs Collection (`songs`)

**Purpose**: Store music tracks with metadata and relationships.

```typescript
{
  _id: ObjectId,           // Primary key
  title: String,           // Song title
  avatar: String,          // Song cover image URL
  description: String,     // Song description
  singerId: String,        // Reference to singers._id
  topicId: String,         // Reference to topics._id
  like: Number,            // Like count (default: 0)
  listen: Number,          // Play count (default: 0)
  lyrics: String,          // Song lyrics (HTML format)
  audio: String,           // Audio file URL
  status: String,          // "active" | "inactive"
  slug: String,            // URL-friendly identifier (auto-generated from title)
  deleted: Boolean,        // Soft delete flag (default: false)
  deletedAt: Date,         // Deletion timestamp
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes**:
- `{ slug: 1 }` - Unique index for URL routing
- `{ topicId: 1, status: 1, deleted: 1 }` - Compound index for topic-based queries
- `{ singerId: 1, status: 1, deleted: 1 }` - Compound index for singer-based queries
- `{ title: "text" }` - Text index for search functionality
- `{ slug: "text" }` - Text index for search functionality

### 4. Favorite Songs Collection (`favorite-songs`)

**Purpose**: Track user's favorite songs (currently session-based).

```typescript
{
  _id: ObjectId,           // Primary key
  userId: String,          // User identifier (currently unused)
  songId: String,          // Reference to songs._id
  deleted: Boolean,        // Soft delete flag (default: false)
  deletedAt: Date,         // Deletion timestamp
  createdAt: Date,         // Creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes**:
- `{ songId: 1 }` - Index for song-based queries
- `{ userId: 1, songId: 1 }` - Compound index for user favorites (when user system is implemented)

## 🔗 Relationships

### One-to-Many Relationships

1. **Topic → Songs**: One topic can have many songs
   - Foreign Key: `songs.topicId` → `topics._id`
   - Query: Find all songs in a topic

2. **Singer → Songs**: One singer can have many songs
   - Foreign Key: `songs.singerId` → `singers._id`
   - Query: Find all songs by a singer

3. **Song → Favorite Songs**: One song can be favorited by many users
   - Foreign Key: `favorite-songs.songId` → `songs._id`
   - Query: Find all users who favorited a song

## 🔍 Query Patterns

### Common Queries

1. **Get songs by topic**:
   ```javascript
   Song.find({
     topicId: topicId,
     status: "active",
     deleted: false
   })
   ```

2. **Get songs by singer**:
   ```javascript
   Song.find({
     singerId: singerId,
     status: "active",
     deleted: false
   })
   ```

3. **Search songs**:
   ```javascript
   Song.find({
     $or: [
       { title: keywordRegex },
       { slug: slugRegex }
     ],
     status: "active",
     deleted: false
   })
   ```

4. **Get favorite songs**:
   ```javascript
   FavoriteSong.find({
     deleted: false
   }).populate('songId')
   ```

## 🚀 Performance Optimizations

### Indexing Strategy

1. **Single Field Indexes**:
   - `slug` fields for URL routing
   - `status` and `deleted` for filtering

2. **Compound Indexes**:
   - `{ topicId: 1, status: 1, deleted: 1 }` for topic-based queries
   - `{ singerId: 1, status: 1, deleted: 1 }` for singer-based queries

3. **Text Indexes**:
   - `{ title: "text" }` for search functionality
   - `{ slug: "text" }` for slug-based search

### Query Optimization

1. **Selective Field Projection**: Use `.select()` to limit returned fields
2. **Pagination**: Implement skip/limit for large result sets
3. **Aggregation**: Use aggregation pipeline for complex queries
4. **Caching**: Consider Redis for frequently accessed data

## 🔒 Data Integrity

### Validation Rules

1. **Required Fields**:
   - Songs: `title`, `singerId`, `topicId`
   - Topics: `title`
   - Singers: `fullName`

2. **Unique Constraints**:
   - All `slug` fields must be unique
   - Song titles should be unique within a topic

3. **Data Types**:
   - Numeric fields: `like`, `listen`
   - Boolean fields: `deleted`
   - Date fields: `deletedAt`, `createdAt`, `updatedAt`

### Soft Delete Implementation

All collections implement soft delete pattern:
- `deleted: false` by default
- Set `deleted: true` and `deletedAt: new Date()` on deletion
- Filter queries with `deleted: false`

## 🔄 Migration Strategy

### Future Enhancements

1. **User System**:
   - Add `users` collection
   - Implement proper user authentication
   - Update `favorite-songs.userId` references

2. **Playlists**:
   - Add `playlists` collection
   - Many-to-many relationship with songs

3. **Comments/Ratings**:
   - Add `comments` collection
   - Add rating system to songs

4. **Analytics**:
   - Add `song_plays` collection for detailed analytics
   - Track user listening history

## 📊 Sample Data

### Topics
```json
{
  "title": "Pop Music",
  "avatar": "https://cloudinary.com/pop-cover.jpg",
  "description": "Popular music from around the world",
  "status": "active",
  "slug": "pop-music"
}
```

### Singers
```json
{
  "fullName": "Taylor Swift",
  "avatar": "https://cloudinary.com/taylor-swift.jpg",
  "status": "active",
  "slug": "taylor-swift"
}
```

### Songs
```json
{
  "title": "Shake It Off",
  "avatar": "https://cloudinary.com/shake-it-off.jpg",
  "description": "Upbeat pop song about ignoring haters",
  "singerId": "singer_id_here",
  "topicId": "topic_id_here",
  "like": 1500,
  "listen": 50000,
  "lyrics": "<p>I stay up too late...</p>",
  "audio": "https://cloudinary.com/shake-it-off.mp3",
  "status": "active",
  "slug": "shake-it-off"
}
```

## 🛠️ Database Connection

The application uses Mongoose to connect to MongoDB:

```typescript
// config/database.ts
import mongoose from "mongoose";

export const connect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect successfully");
    } catch (error) {
        console.log("Connect Error");
    }
}
```

## 📝 Notes

- All timestamps are automatically managed by Mongoose
- Slug generation is handled by `mongoose-slug-updater` plugin
- File uploads are managed through Cloudinary integration
- The current implementation uses session-based favorites (no user authentication)
- Soft delete pattern allows for data recovery and audit trails
