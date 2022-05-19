using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnManager : MonoBehaviour
{
    public GameObject obstacleTree;
    public GameObject obstacleRock;
    public GameObject obstacleFence;
    Vector3 spawnPos = new Vector3(25, 0.5F, 0);
    Vector3 spawnPos2 = new Vector3(25, 1.5F, 0);
    bool gameOver = false;
    private float repeatRate = 4;
    private int obstacleNumber;
    private DogController playerControllerScript;

    // Start is called before the first frame update
    void Start()
    {
        StartCoroutine(SpawnObstacle());
        playerControllerScript = GameObject.Find("Dog").GetComponent<DogController>();
    }

    // Update is called once per frame
    void Update()
    {
        
        if(playerControllerScript.gameOver == true)
            gameOver = true;
        else{
            repeatRate = repeatRate - .0004F;
            obstacleNumber = Random.Range(0, 3);
        }
    }

    IEnumerator SpawnObstacle()
    {
        
        while(! gameOver) {
            yield return new WaitForSeconds(repeatRate);
            if (obstacleNumber == 0) {
                Instantiate(obstacleTree, spawnPos, obstacleTree.transform.rotation);
            }
            else if (obstacleNumber == 1){
                Instantiate(obstacleFence, spawnPos, obstacleFence.transform.rotation);
            }
            else {
                float rotationY = obstacleRock.transform.rotation.y;
                float rotationZ = obstacleRock.transform.rotation.z;
                float rotationX = obstacleRock.transform.rotation.x;
    
                Vector3 rotation = new Vector3(rotationX, rotationY, rotationZ);
                Instantiate(obstacleRock, spawnPos2, Quaternion.Euler(rotation));
            }
        }
    
}
}