package org.shopping.orderservice.domain;

import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.converter.JsonMessageConverter;

@Configuration
@EnableConfigurationProperties(ApplicationProperties.class)
public class KafkaConfiguration {

    @Value("${spring.kafka.bootstrap-servers}")
    private String kafkaBootstrapServers;

    @PostConstruct
    public void init() {
        System.out.println("Resolved Kafka Bootstrap Servers: " + kafkaBootstrapServers);
    }

    private final ApplicationProperties applicationProperties;

    public KafkaConfiguration(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Bean
    public ProducerFactory<String, Object> producerFactory(KafkaProperties kafkaProperties) {
        /*Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBootstrapServers);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);*/
        //        return new DefaultKafkaProducerFactory<>(configProps);
        Map<String, Object> configProps = new HashMap<>(kafkaProperties.buildProducerProperties());
        return new DefaultKafkaProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate(ProducerFactory<String, Object> producerFactory) {
        return new KafkaTemplate<>(producerFactory);
    }

    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        //        Map<String, Object> configProps = new HashMap<>();
        System.out.println("anvesh_kafka)");
        System.out.println("anvesh_kafka)" + kafkaBootstrapServers);
        //        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBootstrapServers);
        //        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "order-service");
        //        configProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        //        configProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        //        configProps.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class);
        //        configProps.put(JsonDeserializer.TRUSTED_PACKAGES,
        // "org.shopping.orderservice.domain.models,org.shopping.notificationservice.domain.models");
        return new DefaultKafkaConsumerFactory<>(new HashMap<>());
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }

    @Bean
    public NewTopic orderEventsTopic() {
        return new NewTopic(applicationProperties.orderEventsTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic newOrdersTopic() {
        return new NewTopic(applicationProperties.newOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic deliveredOrdersTopic() {
        return new NewTopic(applicationProperties.deliveredOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic cancelledOrdersTopic() {
        return new NewTopic(applicationProperties.cancelledOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic errorOrdersTopic() {
        return new NewTopic(applicationProperties.errorOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public JsonMessageConverter jsonMessageConverter() {
        return new JsonMessageConverter();
    }
}
