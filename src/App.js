import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {

  const [repositories, setRepository] = useState([])
  /**
    Listar os repositórios da sua API: Deve ser capaz de criar uma lista de todos os repositórios que estão cadastrados na sua API com os campos title, 
    techs e número de curtidas seguindo o padrão ${repository.likes} curtidas, apenas alterando o número para ser dinâmico.

    Curtir um repositório listado da API: Deve ser capaz de curtir um item na sua API através de um botão com o texto Curtir e deve atualizar o número de likes na listagem no mobile
   */

  // seta os repositórios na variável repositories
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, [])

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`repositories/${id}/like`)
    const likedRepository = response.data
    const repositoriesUpdated = repositories.map( repo => {
      if (repo.id == id) {
        return likedRepository
      } else {
        return repo
      }
    })
      
    setRepository(repositoriesUpdated)
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          
          <FlatList           
            data= {repositories}
            keyExtractor={repo => repo.id}
            renderItem={({item: repo}) => (
              <>
                <Text style={styles.repository}>{repo.title}</Text>

                <View style={styles.techsContainer}>
                

                <Text style={styles.tech}>
                  {repo.techs}
                </Text>
                 

                </View>

                <View style={styles.likesContainer}>
                  <Text style={styles.likeText}  testID={`repository-likes-${repo.id}`} >
                    {repo.likes} curtidas
                  </Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => handleLikeRepository(repo.id)} testID={`like-button-${repo.id}`} >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </>
            )}
          />


          <FlatList  >
          
            

          </FlatList>


        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
