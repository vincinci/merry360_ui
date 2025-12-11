/**
 * Cloudinary Service
 * Image hosting and 360° virtual tour integration
 */

import { Cloudinary } from 'cloudinary-core'

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// Initialize Cloudinary
let cloudinary = null
if (cloudName) {
  cloudinary = new Cloudinary({ cloud_name: cloudName, secure: true })
}

/**
 * Cloudinary Service
 */
export const cloudinaryService = {
  /**
   * Check if Cloudinary is configured
   */
  isConfigured() {
    return !!cloudName
  },

  /**
   * Get optimized image URL
   */
  getImageUrl(publicId, transformations = {}) {
    if (!cloudinary) {
      console.warn('Cloudinary not configured')
      return publicId
    }

    const defaultTransformations = {
      quality: 'auto',
      fetch_format: 'auto',
      ...transformations
    }

    return cloudinary.url(publicId, defaultTransformations)
  },

  /**
   * Get thumbnail URL
   */
  getThumbnailUrl(publicId, width = 400, height = 300) {
    return this.getImageUrl(publicId, {
      width,
      height,
      crop: 'fill',
      gravity: 'auto'
    })
  },

  /**
   * Get responsive image URLs
   */
  getResponsiveUrls(publicId) {
    return {
      small: this.getImageUrl(publicId, { width: 640, crop: 'scale' }),
      medium: this.getImageUrl(publicId, { width: 1024, crop: 'scale' }),
      large: this.getImageUrl(publicId, { width: 1920, crop: 'scale' }),
      original: this.getImageUrl(publicId)
    }
  },

  /**
   * Upload image
   */
  async uploadImage(file) {
    if (!uploadPreset) {
      throw new Error('Cloudinary upload preset not configured')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    formData.append('cloud_name', cloudName)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      )

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed')
      }

      return {
        publicId: data.public_id,
        url: data.secure_url,
        width: data.width,
        height: data.height,
        format: data.format
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      throw error
    }
  },

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(files) {
    const uploadPromises = Array.from(files).map(file => this.uploadImage(file))
    return await Promise.all(uploadPromises)
  },

  /**
   * Get 360° virtual tour embed code
   */
  get360TourEmbed(publicId, options = {}) {
    if (!cloudinary) {
      return null
    }

    const defaultOptions = {
      transformation: [
        { width: 1920, height: 1080, crop: 'fill' },
        { effect: 'vignette:20' }
      ],
      controls: true,
      autoplay: false,
      ...options
    }

    // Generate 360° viewer URL
    const viewerUrl = `https://res.cloudinary.com/${cloudName}/image/upload/fl_360/${publicId}`

    return {
      url: viewerUrl,
      embedCode: `
        <div class="cloudinary-360-viewer" data-public-id="${publicId}">
          <iframe 
            src="${viewerUrl}" 
            width="100%" 
            height="600" 
            frameborder="0" 
            allowfullscreen
            allow="accelerometer; gyroscope"
          ></iframe>
        </div>
      `,
      directUrl: viewerUrl
    }
  },

  /**
   * Create 360° virtual tour gallery
   */
  create360Gallery(images) {
    if (!Array.isArray(images) || images.length === 0) {
      return null
    }

    return {
      images: images.map((publicId, index) => ({
        id: index,
        publicId,
        url: this.getImageUrl(publicId, {
          transformation: 'fl_360',
          quality: 'auto:best'
        }),
        thumbnail: this.getThumbnailUrl(publicId, 300, 200),
        is360: true
      })),
      viewer: 'cloudinary-360-gallery',
      autoRotate: true,
      controls: {
        zoom: true,
        pan: true,
        fullscreen: true,
        navigation: true
      }
    }
  },

  /**
   * Generate video preview for 360 tours
   */
  get360VideoPreview(publicId) {
    return this.getImageUrl(publicId, {
      transformation: 'sp_full/e_loop/f_auto:video',
      resource_type: 'video'
    })
  },

  /**
   * Delete image
   */
  async deleteImage(publicId) {
    // Note: Deletion requires server-side implementation for security
    console.warn('Image deletion should be done server-side')
    
    return {
      success: false,
      message: 'Delete operation requires backend implementation'
    }
  },

  /**
   * Generate signed upload URL (requires backend)
   */
  async getSignedUploadUrl() {
    console.warn('Signed upload requires backend implementation')
    
    return {
      url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      signature: 'requires_backend',
      timestamp: Date.now()
    }
  }
}

/**
 * 360° Tour Widget Component Helper
 */
export const create360Widget = (containerId, publicIds) => {
  if (!cloudinary || !publicIds || publicIds.length === 0) {
    return null
  }

  return {
    containerId,
    images: publicIds,
    options: {
      cloudName,
      controls: true,
      navigation: true,
      zoom: {
        enabled: true,
        min: 1,
        max: 3
      },
      rotation: {
        enabled: true,
        speed: 0.5
      },
      transitions: {
        type: 'fade',
        duration: 500
      }
    },
    initialize() {
      // Widget initialization code would go here
      console.log('360° tour widget initialized for container:', containerId)
    }
  }
}

export default cloudinaryService
