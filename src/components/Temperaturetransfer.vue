<template>
  <div class="temperature-transfer">
    <div class="input-container">
      <label for="celsius">Nhập nhiệt độ (°C)</label>
      <input
        type="number"
        id="celsius"
        v-model="celsius"
        placeholder="Nhập độ C"
        @input="convertTemperature"
        class="temp-input"
      />
    </div>

    <button @click="convertTemperature" class="convert-btn">Chuyển đổi sang °F</button>

    <div v-if="fahrenheit !== null" class="result-container">
      <p class="result-text">Nhiệt độ: <span class="fahrenheit">{{ fahrenheit }} °F</span></p>
      <button @click="shareTemperature" class="share-btn">Chia sẻ kết quả</button>
    </div>

    <button @click="getCurrentLocation" class="location-btn">Lấy vị trí hiện tại</button>
    
    <div v-if="location" class="location-container">
      <p class="location-text">
        Vị trí: <span class="coords">Lat {{ location.latitude }}, Lon {{ location.longitude }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { Geolocation } from '@capacitor/geolocation';

export default {
  name: 'TemperatureTransfer',
  data() {
    return {
      celsius: '',
      fahrenheit: null,
      location: null,
      apiUrl: 'http://172.20.10.2:3001/temperature' // IP của bạn
    };
  },
  methods: {
    convertTemperature() {
      if (!this.celsius) return;
      const c = parseFloat(this.celsius);
      this.fahrenheit = (c * 9) / 5 + 32;
      this.notifyTemperature();
    },
    async notifyTemperature() {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Nhiệt độ đã chuyển đổi',
              body: `Nhiệt độ là ${this.fahrenheit} °F`,
              id: 1,
              schedule: { at: new Date(Date.now() + 1000) }
            }
          ]
        });
      } catch (error) {
        console.error('Error scheduling notification:', error);
      }
    },
    async shareTemperature() {
      try {
        const shareUrl = `${this.apiUrl}?fahrenheit=${this.fahrenheit}`;
        await Share.share({
          title: 'Kết quả chuyển đổi nhiệt độ',
          text: `Nhiệt độ của tôi là ${this.fahrenheit} °F. Xem tại đây!`,
          url: shareUrl,
          dialogTitle: 'Chia sẻ nhiệt độ'
        });
      } catch (error) {
        console.error('Error sharing temperature:', error);
      }
    },
    async getCurrentLocation() {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        this.location = {
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude
        };
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }
  }
};
</script>

<style scoped>
.temperature-transfer {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.input-container {
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  font-size: 1.1rem;
  color: #34495e;
  margin-bottom: 8px;
}

.temp-input {
  width: 100%;
  padding: 12px;
  font-size: 1.2rem;
  border: 2px solid #3498db;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.temp-input:focus {
  outline: none;
  border-color: #2980b9;
}

.convert-btn {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.convert-btn:hover {
  background-color: #c0392b;
}

.result-container {
  margin: 20px 0;
  padding: 15px;
  background-color: #ecf0f1;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.result-text {
  font-size: 1.2rem;
  color: #2c3e50;
}

.fahrenheit {
  font-weight: bold;
  color: #e74c3c;
}

.share-btn {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.share-btn:hover {
  background-color: #2980b9;
}

.location-btn {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.location-btn:hover {
  background-color: #27ae60;
}

.location-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #ecf0f1;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.location-text {
  font-size: 1.1rem;
  color: #2c3e50;
}

.coords {
  font-weight: bold;
  color: #2ecc71;
}
</style>