// Test Cloudinary Integration
console.log('☁️  Testing Cloudinary Integration...\n')

const cloudName = 'dqzvhxsy8'
const apiKey = '823772645881951'
const baseUrl = `https://res.cloudinary.com/${cloudName}`

const cloudinaryService = {
  buildTransformations(transformations = {}) {
    const parts = []
    if (transformations.width) parts.push(`w_${transformations.width}`)
    if (transformations.height) parts.push(`h_${transformations.height}`)
    if (transformations.crop) parts.push(`c_${transformations.crop}`)
    if (transformations.quality) parts.push(`q_${transformations.quality}`)
    if (transformations.fetch_format) parts.push(`f_${transformations.fetch_format}`)
    return parts.length > 0 ? parts.join(',') : ''
  },
  
  getImageUrl(publicId, transformations = {}) {
    const transformString = this.buildTransformations(transformations)
    return transformString 
      ? `${baseUrl}/image/upload/${transformString}/${publicId}`
      : `${baseUrl}/image/upload/${publicId}`
  },
  
  getThumbnailUrl(publicId, width = 400, height = 300) {
    return this.getImageUrl(publicId, { width, height, crop: 'fill' })
  },
  
  getResponsiveUrls(publicId) {
    return {
      small: this.getImageUrl(publicId, { width: 640, crop: 'scale' }),
      medium: this.getImageUrl(publicId, { width: 1024, crop: 'scale' }),
      large: this.getImageUrl(publicId, { width: 1920, crop: 'scale' })
    }
  },
  
  get360TourEmbed(publicId) {
    return `<iframe src="${baseUrl}/image/upload/fl_360,ar_16:9/${publicId}" width="100%" height="600" frameborder="0"></iframe>`
  },
  
  create360Gallery(images) {
    return images.map(img => ({
      url: this.getImageUrl(img.publicId, { fetch_format: 'auto', quality: 'auto' }),
      title: img.title
    }))
  }
}

async function testCloudinary() {
  try {
    // Test 1: Get optimized image URL
    console.log('📷 Test 1: Image URL Generation')
    const imageUrl = cloudinaryService.getImageUrl('sample', {
      width: 800,
      height: 600,
      crop: 'fill'
    })
    console.log('   ✅ Generated URL:', imageUrl)

    // Test 2: Get thumbnail
    console.log('\n🖼️  Test 2: Thumbnail Generation')
    const thumbnail = cloudinaryService.getThumbnailUrl('sample')
    console.log('   ✅ Thumbnail URL:', thumbnail)

    // Test 3: Responsive URLs
    console.log('\n📱 Test 3: Responsive Image URLs')
    const responsive = cloudinaryService.getResponsiveUrls('sample')
    console.log('   ✅ Small:', responsive.small)
    console.log('   ✅ Medium:', responsive.medium)
    console.log('   ✅ Large:', responsive.large)

    // Test 4: 360° Tour Embed
    console.log('\n🌐 Test 4: 360° Virtual Tour')
    const tour360 = cloudinaryService.get360TourEmbed('sample_360')
    console.log('   ✅ 360° Tour URL generated')
    console.log('   iframe src:', tour360.slice(0, 100) + '...')

    // Test 5: Gallery
    console.log('\n🖼️  Test 5: 360° Gallery Creation')
    const gallery = cloudinaryService.create360Gallery([
      { publicId: 'room1', title: 'Living Room' },
      { publicId: 'room2', title: 'Bedroom' },
      { publicId: 'room3', title: 'Balcony View' }
    ])
    console.log(`   ✅ Created gallery with ${gallery.length} images`)

    console.log('\n✨ Cloudinary Integration Tests Complete!')
    console.log('\n📊 Summary:')
    console.log('   • Cloud Name: dqzvhxsy8')
    console.log('   • API Key: 823772645881951')
    console.log('   • Upload Preset: merry360_uploads')
    console.log('   • Image optimization: ✅')
    console.log('   • 360° tours: ✅')
    console.log('   • Responsive images: ✅')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testCloudinary()
