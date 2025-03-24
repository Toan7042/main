<template>
  <div class="bmi-calculator">
    <h1>Tính BMI</h1>
    <label for="height">Chiều cao (cm):</label>
    <input type="number" id="height" v-model.number="height" placeholder="Nhập chiều cao" />
    <label for="weight">Cân nặng (kg):</label>
    <input type="number" id="weight" v-model.number="weight" placeholder="Nhập cân nặng" />
    <button @click="calculateBMI">Tính BMI</button>
    <p v-if="bmi !== null">Chỉ số BMI: {{ bmi.toFixed(1) }} - {{ bmiStatus }}</p>
    <button v-if="bmi !== null" @click="shareBMI">Chia sẻ kết quả BMI</button>
  </div>
</template>

<script>
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';

export default {
  name: 'BMICalculator',
  data() {
    return {
      height: null,
      weight: null,
      bmi: null,
      bmiStatus: ''
    };
  },
  methods: {
    calculateBMI() {
      if (!this.height || !this.weight || this.height <= 0 || this.weight <= 0) {
        alert('Vui lòng nhập chiều cao và cân nặng hợp lệ!');
        return;
      }
      const heightInMeters = this.height / 100; // Chuyển cm sang m
      this.bmi = this.weight / (heightInMeters * heightInMeters); // Tính BMI
      this.bmiStatus = this.getBMIStatus(this.bmi); // Đánh giá trạng thái
      this.notifyBMI(); // Gửi thông báo
    },
    getBMIStatus(bmi) {
      if (bmi < 18.5) return 'Gầy';
      else if (bmi < 25) return 'Bình thường';
      else if (bmi < 30) return 'Thừa cân';
      else return 'Béo phì';
    },
    async notifyBMI() {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Kết quả BMI',
              body: `Chỉ số BMI của bạn là ${this.bmi.toFixed(1)} (${this.bmiStatus})`,
              id: 1,
              schedule: { at: new Date(Date.now() + 1000) }
            }
          ]
        });
      } catch (error) {
        console.error('Error scheduling notification:', error);
      }
    },
    async shareBMI() {
      try {
        await Share.share({
          title: 'Kết quả BMI',
          text: `Chỉ số BMI của tôi là ${this.bmi.toFixed(1)} (${this.bmiStatus})`,
          url: 'https://example.com/bmi', // URL tùy chọn (có thể thay bằng link API nếu có)
          dialogTitle: 'Chia sẻ kết quả BMI'
        });
      } catch (error) {
        console.error('Error sharing BMI:', error);
      }
    }
  }
};
</script>

<style scoped>
.bmi-calculator {
  text-align: center;
  padding: 20px;
}
input, button {
  margin: 10px 0;
  padding: 5px;
  width: 200px;
}
button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>