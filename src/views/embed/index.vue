 <template>
  <container-frame :src="this.$route.query.url" />
</template>


<script>
import containerFrame from '@/components/containerFrame';
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$route.query);
  },
  methods: {},
  components: {
    containerFrame: containerFrame,
  },
};
</script>

<style scoped lang='scss'>
</style>