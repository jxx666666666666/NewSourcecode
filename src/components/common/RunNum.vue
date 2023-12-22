<!-- demo.vue -->
<template>
  <div class="statisContent" v-loading="loading">
    <div class="chartNum">
      <div class="box-item">
        <li
          :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
          v-for="(item, index) in orderNum"
          :key="index"
        >
          <span v-if="!isNaN(item)">
            <i ref="numberItem">0123456789</i>
          </span>
          <span class="comma" v-else>{{ item }}</span>
        </li>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      loading: false,
      orderNum: ['0', '0', ',', '0', '0', '0', ',', '0', '0', '0'],
      count: 100,
    };
  },
  methods: {
    // Set text scrolling
    setNumberTransform() {
      const numberItems = this.$refs.numberItem; // Obtain the ref of the number and calculate the number of elements
      const numberArr = this.orderNum.filter((item) => !isNaN(item));
      // Combining CSS to scroll through numerical characters and display order quantity
      for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`;
      }
    },
    // Process total order numbers
    toOrderNum(num) {
      num = num.toString();
      // Convert the number of orders into a string
      if (num.length < 8) {
        num = '0' + num; // If less than eight digits are reached, add "0" to fill in the space
        this.toOrderNum(num); // Recursive addition of '0' in place
      } else if (num.length === 8) {
        // Adding commas to the number of orders
        num = num.slice(0, 2) + ',' + num.slice(2, 5) + ',' + num.slice(5, 8);
        this.orderNum = num.split(''); // Convert it into data and render it to a scrolling array
      } else {
        // Abnormal display when the total order quantity exceeds eight digits
        this.$message.warning('The total order quantity is too large and the display is abnormal. Please contact customer service');
      }
    },
    increaseNumber() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let self = this;
      this.timer = setInterval(() => {
        self.count = self.count + this.getRandomNumber(1, 100);
        this.toOrderNum(self.count);
        this.$nextTick(() => {
          self.setNumberTransform(self.count);
        });
      }, 3000);
    },
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
      //random generation
    },
  },
  mounted() {
    this.increaseNumber();
  },
};
</script>
  
  <style lang=less>
.statisContent {
  padding-top: 20px;

  .number-item {
    width: 41px;
    height: 75px;
    list-style: none;
    margin-right: 5px;
    border-radius: 4px;
    display: inline-block;
    font-size: 70px;
    font-family: 'Roboto';
    // background-image: linear-gradient(to top, #fffae9, #ffd24d);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;

    & > span {
      position: relative;
      display: inline-block;
      margin-right: 10px;
      width: 100%;
      height: 100%;
      writing-mode: vertical-rl;
      text-orientation: upright;
      overflow: hidden;
      
      & > i {
        font-style: normal;
        position: absolute;
        top: 7px;
        left: 50%;
        transform: translate(-50%, 0);
        transition: transform 1s ease-in-out;
        letter-spacing: 10px;

        background-image: linear-gradient(to top, #fffae9, #ffd24d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      }
    }
  }
  .number-item:last-child {
    margin-right: 0;
  }
  .comma {
    display: inline-block;
    color: #fff;
    font-size: 30px;
  }
  .mark-item {
    display: inline-block;
  }
}
</style>
  
  